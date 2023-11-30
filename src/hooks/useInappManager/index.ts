import { useState, useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';

type FynoProps = {
  distinctId: string;
  workspaceId: string;
  integrationId: string;
  signature: string;
  overrideInappUrl?: string;
};

export enum NotificationPriority {
  HIGH = 10,
  NORMAL = 5,
  LOW = 0,
}
type Notification = {
  _id: any;
  to: string;
  ws_id: string;
  campaign_id?: string;
  status: DeliverStatus[];
  isRead: boolean;
  notification_content: NotificationContent;
  notification_settings?: NotificationSettings;
  additional_data?: any;
};

type DeliverStatus = {
  messageId: any;
  to: string;
  isRead?: boolean;
  ws_id: string;
  status: string;
  timestamp: number;
};

type NotificationButtons = {
  lable: string;
  action?: string;
  primary?: boolean;
  sameTab?: boolean;
};

type NotificationAttachments = {
  attachment: Object;
  type: string;
};

type NotificationSettings = {
  ttl?: number;
  retention?: number;
  priority?: NotificationPriority;
};

type NotificationContent = {
  silent_message: boolean;
  title?: string;
  body?: string;
  icon?: string;
  tag?: string;
  action?: { href: string; sameTab: boolean };
  buttons?: NotificationButtons[];
  attachments?: NotificationAttachments;
  additional_data?: any;
};

const useInappManager = (props: FynoProps) => {
  const { distinctId, workspaceId, integrationId, signature, overrideInappUrl } =
    props;
  const [errMsg, setErrMsg] = useState<string>('');
  const [list, setList] = useState<Array<Notification>>([]);
  const [unreadList, setUnreadList] = useState<Array<Notification>>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  // const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const socketRef = useRef<Socket | null>(null);
  const resetState = () => {
    setErrMsg('');
    setList([]);
    setCount(0);
    setUnreadCount(0);
  };

  const handleChangeStatus = (status: DeliverStatus) => {
    if (status.status === 'DELETED') {
      setList((prev) => prev.filter((msg) => msg._id !== status.messageId));
      setCount((prev) => prev - 1);
      if (!status?.isRead) {
        setUnreadCount((prev) => prev - 1);
      }
    } else if (status.status === 'READ') {
      setList((prev) => {
        const message = prev.find((msg) => msg._id === status.messageId);
        if (message) {
          message?.status.push(status);
          message.isRead = true;
        }

        return prev;
      });
      setUnreadList((prev) => prev.filter((msg) => msg._id !== status.messageId));
      setUnreadCount((prev) => prev - 1);
    } else {
      setList((prev) => {
        prev.find((msg) => msg._id === status.messageId)?.status.push(status);
        return prev;
      });
    }
  };

  useEffect(() => {
    const inappUrl = overrideInappUrl || 'https://inapp.fyno.io';
    if (socketRef.current === null) {
      socketRef.current = io(inappUrl, {
        transports: ['polling', 'websocket'],
        auth: {
          user_id: distinctId,
          WS_ID: workspaceId,
          Integration_ID: integrationId,
        },
        extraHeaders: {
          'x-fyno-signature': signature,
          cookie: `x-fyno-cookie=${signature}`,
          origin: 'http://localhost',
        },
        withCredentials: true,
      });
    }
    socketRef.current.on('connect_error', (err) => {
      setErrMsg(err.message);
    });
    socketRef.current.on('connectionSuccess', () => {
      console.log(
        '🚀 ~ file: NotificationsHomeContext.js:75 ~ socketRef.current.on ~ connectionSuccess:',
      );
      resetState();
      socketRef.current?.emit('get:messages', { filter: 'all', page: 1 });
    });
    socketRef.current.on('message', (data) => {
      console.log('inside message received socket');
      socketRef.current?.emit('message:recieved', { id: data._Id });
      if (!data?.notification_content?.silent_message) {
        handleIncomingMessage(data);
      }
    });
    socketRef.current.on('messages:state', (data) => {
      data.filter === 'all'
        ? setList((prev) => {
            if (data.messages.messages?.length > 0 && data?.page > 2) {
              return prev.concat(data.messages.messages);
            } else {
              return data.messages.messages;
            }
          })
        : setUnreadList((prev) => {
            if (data.messages.messages?.length > 0 && data?.page > 2) {
              return prev.concat(data.messages.messages);
            } else {
              return data.messages.messages;
            }
          });
      setUnreadCount(data.messages.unread);
      setCount(data.messages.total);
      // setPage(data.page);
    });
    socketRef.current.on('statusUpdated', (status) => {
      handleChangeStatus(status);
    });
    // socketRef.current.on('lastSeenUpdated', time => {
    //   localStorage.setItem('fynoinapp_ls', time);
    // });
    socketRef.current.on('tag:updated', (id) => {
      var id_done = '';

      setList((prev) => {
        var prevMessage = prev.filter((item) => item._id === id);
        if (
          id_done !== id &&
          !new RegExp(/"READ"/).test(JSON.stringify(prevMessage[0]?.status))
        ) {
          setUnreadCount((ucount) => ucount - 1);
          id_done = id;
        }
        return prev.filter((item) => item._id !== id);
      });
      setCount((prev) => prev - 1);
    });
    socketRef.current.on('disconnect', (err) => {
      setErrMsg(err.toString);
    });

    return () => {
      console.log(
        '🚀 ~ file: NotificationsHomeContext.js:135 ~ return ~ disconnect:',
      );
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUnreadList(list?.filter((msg) => !msg?.isRead));
  }, [list]);

  const loadMoreNotifications = (page: number, type: string) => {
    if (socketRef.current) {
      socketRef.current.emit('get:messages', { filter: type, page: page });
    }
  };

  const deleteAllMessages = () => {
    socketRef.current?.emit('markAll:delete', signature);
    setUnreadCount(0);
  };

  const handleMarkAllAsRead = () => {
    socketRef.current?.emit('markAll:read', signature);
    setUnreadCount(0);
  };

  const handleClick = () => {};

  const handleIncomingMessage = (message: Notification) => {
    message.isRead = false;
    console.log('in handleIncomingMessage');
    setList((prev) => {
      return [message, ...prev];
    });
    setCount((prev) => prev + 1);
    setUnreadCount((prev) => prev + 1);
  };

  const handleDelete = (msg: Notification) => {
    socketRef.current?.emit('message:deleted', msg);
  };

  const handleMarkAsRead = (msg: Notification) => {
    socketRef.current?.emit('message:read', msg);
  };

  return {
    data: {
      unreadCount,
      list,
      unreadList,
      count,
      errMsg,
    },
    handlers: {
      handleClick,
      handleIncomingMessage,
      handleMarkAsRead,
      handleDelete,
      loadMoreNotifications,
      deleteAllMessages,
      handleMarkAllAsRead,
    },
  };
};

export default useInappManager;
