import React from "react";
import { Snackbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class Notification extends React.Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={this.props.showNotification}
        onClose={this.props.handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{this.props.message}</span>}
        autoHideDuration={1000}
      />
    );
  }
}

export default Notification;
