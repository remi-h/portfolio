import Header from './Header'

export default function Layout({ children }) {
  var year = new Date().getFullYear();
  return (
    <>
      <div className="layout">
        <Header />
        <div className="page-content">
          {children}
        </div>
      </div>
      <footer>
        <p>© {year} REMI HIGUCHI</p>
      </footer>
    </>
  )
}