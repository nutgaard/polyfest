import * as React from 'react';

function Main({ children }: { children: Array<React.ReactNode> | React.ReactNode }) {
    return (
        <main className="main">
            {children}
        </main>
    );
}

export default Main;