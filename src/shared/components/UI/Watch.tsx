import React from "react";

interface WatchProps {}

interface WatchState {
  time: Date;
}

class Watch extends React.Component<WatchProps, WatchState> {
  private intervalId: NodeJS.Timeout | undefined;

  constructor(props: WatchProps) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  render() {
    const { time } = this.state;
    return (
      <div className="watchContainer">
        <div className="watch">{this.formatTime(time)}</div>
      </div>
    );
  }
}

export default Watch;
