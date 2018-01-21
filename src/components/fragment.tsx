import * as React from 'react';

type FragmentProps = {
    children: Array<React.ReactNode>
};

class Fragment extends React.Component<FragmentProps, {}> {
    render() {
        return this.props.children;
    }
}

export default Fragment;