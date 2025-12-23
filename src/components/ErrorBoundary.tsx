import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#d4af37' }}>
            ARTLUX∞
          </h1>
          <p style={{ marginBottom: '24px', color: '#999' }}>
            Something went wrong loading the page.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '12px 32px',
              backgroundColor: '#d4af37',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Refresh Page
          </button>
          <a
            href="https://artlux8.com"
            style={{
              marginTop: '16px',
              color: '#d4af37',
              textDecoration: 'underline',
            }}
          >
            Open in Browser
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
