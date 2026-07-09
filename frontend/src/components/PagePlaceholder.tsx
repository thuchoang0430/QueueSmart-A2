interface PagePlaceholderProps {
  title: string
  todo: string
}

export default function PagePlaceholder({ title, todo }: PagePlaceholderProps) {
  return (
    <div className="container">
      <div className="page-header">
        <h1>{title}</h1>
      </div>
      <div className="card">
        <p>TODO: {todo}</p>
      </div>
    </div>
  )
}
