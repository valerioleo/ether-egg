import React from 'react';
import Notification from './Notification';
import SystemConnection from '../../../bridge/SystemConnection';

const StickyNotification = props => {
  const {system, resetNotification} = props;

  const {variant, message} = system.get('notification');

  return (
    message
      ? <Notification
        variant={variant}
        open={true}
        onExited={resetNotification}
        message={message}
      />
      : null
  );
};

export default SystemConnection(StickyNotification);
