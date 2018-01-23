import * as React from 'react';

function SvgButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (<button className="btn" {...props} />);
}

export default SvgButton;