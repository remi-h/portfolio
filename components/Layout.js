import Header from './Header'

export default function Layout({ children }) {
  return (
    <>
      <div className="layout">
        <Header />

        <div className="page-content">
          {children}
        </div>
      </div>
      <footer>
        <p>© 2022 REMI HIGUCHI</p>
      </footer>
    </>
  )
}