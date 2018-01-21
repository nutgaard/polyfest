import * as React from 'react';

function SvgButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (<button className="svgviewer__btn" {...props} />);
}

export default SvgButton;