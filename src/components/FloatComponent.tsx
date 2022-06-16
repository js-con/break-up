import * as React from 'react'

const FloatComponent: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const el = React.useRef(null)
  const [prevX, setPrevX] = React.useState(25)
  const [prevY, setPrevY] = React.useState(50)

  function moveHandler(e: any) {
    setPrevX(window.innerWidth - e.touches[0].clientX)
    setPrevY(window.innerHeight - e.touches[0].clientY)
  }

  return (
    <div>
      <div
        onTouchMove={e => moveHandler(e)}
        className="fixed"
        style={{ bottom: prevY, right: prevX }}
        ref={el}
      >
        {children}
      </div>
    </div>
  )
}

export default FloatComponent
