import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="max-w-md w-full animate-bounce-in hover-lift">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 animate-pulse-glow">
                <AlertTriangle className="h-8 w-8 text-destructive animate-bounce" />
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                We encountered an unexpected error. Don't worry, we're on it!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-muted/50 p-4 rounded-lg border animate-fade-in">
                  <p className="text-sm font-medium text-foreground mb-2">🔧 Error Details (Dev Mode):</p>
                  <p className="text-xs text-muted-foreground font-mono break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <div className="flex gap-3">
                <Button 
                  onClick={this.handleReset} 
                  className="flex-1 btn-interactive hover-lift"
                  variant="outline"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="flex-1 btn-interactive hover-lift"
                >
                  Refresh Page
                </Button>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  If the problem persists, please contact support
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
