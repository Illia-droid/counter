import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Counter.module.css";
class Counter extends Component {
  /**
   * 
   * @param {number} step 
   */
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isAdd: true,
      timerStopWatch: 0,
      leftWorkAutocliker: 30,
      isAutoClicking: false,
    };
    this.autoClickerInterval = null;
  }

  handlerClick = () => {
    const { isAdd } = this.state;
    const { step } = this.props;

    this.setState((state) => ({
      count: isAdd ? state.count + Number(step) : state.count - Number(step),
    }));
  };

  handleSwitchRow = () => {
    this.setState((state) => ({
      isAdd: !state.isAdd,
    }));
  };

  changeTimerIndicators = () => {
    this.setState((state) => ({
      timerStopWatch: state.timerStopWatch + 1,
      leftWorkAutocliker: state.leftWorkAutocliker - 1,
    }));
  };

  autoClicker = () => {
    if (this.autoClickerInterval === null) {
      this.setState({
        leftWorkAutocliker: 30,
        isAutoClicking: true,
      });

      this.autoClickerInterval = setInterval(() => {
        const { leftWorkAutocliker } = this.state;

        this.handlerClick();
        this.changeTimerIndicators();

        if (leftWorkAutocliker === 1) {
          clearInterval(this.autoClickerInterval);
          this.autoClickerInterval = null;
          this.setState({
            isAutoClicking: false,
          });
        }
      }, 1000);
    }
  };

  componentDidMount() {
    this.autoClicker();
  }

  render() {
    const { count, isAdd, timerStopWatch, leftWorkAutocliker, isAutoClicking } =
      this.state;
    const { step } = this.props;
    return (
      <section className={styles["counter-section"]}>
        <h2>count: {count}</h2>
        <h2>step: {step}</h2>
        <h2>timerStopWatch: {timerStopWatch}</h2>
        <h2>leftSeconds: {leftWorkAutocliker}</h2>
        <button onClick={this.handlerClick} disabled={isAutoClicking}>
          {isAdd ? "plus" : "minus"}
        </button>
        <button onClick={this.handleSwitchRow}>switch row</button>
        <button onClick={this.autoClicker} disabled={isAutoClicking}>
          AutoClick
        </button>
      </section>
    );
  }
}

Counter.propTypes = {
  step: PropTypes.number.isRequired,
};
Counter.defaultProps = {
  step: 1,
};
export default Counter;
