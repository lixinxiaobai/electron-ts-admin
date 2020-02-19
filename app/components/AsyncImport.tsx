import * as React from "react";

interface States {
    comp:JSX.IntrinsicElements|any
}


interface PromiseComFun {
    (): Promise<any>
}

export default function asyncComponent(importComponent:PromiseComFun) {
    class AsyncComponent extends React.Component<any,States> {
        constructor(props:any) {
            super(props)
            this.state = { comp: null }
        }

        componentDidMount() {
            importComponent().then(({ default: comp }) => {
              //  console.log(comp)
                this.setState({ comp })
            })
        }

        render() {
            const { comp: Comp } = this.state
            return Comp ? <Comp {...this.props} /> : null
        }
    }

    return AsyncComponent
}