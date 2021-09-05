import React from "react";
import Box from "../../components/box";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box height="100%" width="100%">
          <Box textAlign="center">
            <h2>
              Something went wrong.
              <br /> It was unexpected. Apologies!
            </h2>
            <br />I request you to please mail this to issue to me on my email
            id-
            <a href="mailto:mailtoayushshekhar@gmail.com">
              {" "}
              mailtoayushshekhar@gmail.com{" "}
            </a>
            <br />
            <br />
            Tip: You can also check error reason in your console. Right click{" "}
            {"->"} select Inspect Element {"->"} Console
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
