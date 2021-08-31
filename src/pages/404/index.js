import React, { memo } from "react";

const LoginComponent = props => {
    const { route } = props
    console.log(route)
    const jumpTo = e => {
        console.log(e)
        props.history.push('mine')
      }

    return (
        <div onClick = { e => jumpTo(e)}>404</div>
    )
}

export default memo(LoginComponent)