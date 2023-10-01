export class DefaultModel {
  static provideDocumentation() {
    return `
    <section>
      <h1>ATRA architecture backend DOCS</h1>
      <a href="https://github.com/oscarprdev/atra-backend" target="_blank">ATRA code</a>
      <div>
        <h2>Endpoints</h2>
        <h3>GET</h3>
        <p>Get text information based on a screen</p>
        <ul>
          <li>
            https://atra-backend.vercel.app/home
          </li>
          <li>
            https://atra-backend.vercel.app/about
          </li>
          <li>
            https://atra-backend.vercel.app/personal-info
          </li>
          <li>
            https://atra-backend.vercel.app/projects
          </li>
        </ul>
        <h3>PATCH</h3>
        <p>Update text information based on a screen</p>
        <ul>
          <li>
            https://atra-backend.vercel.app/home
            <p>body: { title: string, subtitle: string }</p>
          </li>
          <li>
            https://atra-backend.vercel.app/about
            <p>body: { title: string, text: string }</p>
          </li>
          <li>
            https://atra-backend.vercel.app/personal-info
            <p>body: { name: string, phone: string, email: string, direction: string }</p>
          </li>
        </ul>
      </div>
    </section>
    `;
  }
}
