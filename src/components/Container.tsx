
type TContainer ={
    children : React.ReactNode
}

function Container({children}: TContainer) {
  return (
    <div className="container mx-auto">
        {children}
    </div>
  )
}

export default Container