import * as React from 'react';

function Aside({ children }: { children: Array<React.ReactNode> | React.ReactNode }) {
    return (
        <aside className="aside">
            {children}
        </aside>
    );
}

export default Aside;