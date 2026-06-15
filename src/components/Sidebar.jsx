import './Sidebar.css'

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return (
    <div className="avatar" aria-hidden="true">
      {initials}
    </div>
  )
}

function ContactItem({ icon, children }) {
  return (
    <div className="contact-item">
      <span className="contact-icon">{icon}</span>
      <span>{children}</span>
    </div>
  )
}

export default function Sidebar({ identity, skills, extras }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {/* Identity */}
        <div className="sidebar-hero">
          <Avatar name={identity.name} />
          <h1 className="sidebar-name">{identity.name}</h1>
          <p className="sidebar-title">{identity.title}</p>
          <p className="sidebar-tagline">{identity.tagline}</p>
        </div>

        {/* Contact */}
        <section className="sidebar-section">
          <h2 className="sidebar-section-title">Contact</h2>
          <div className="contact-list">
            <ContactItem icon="📍">{identity.location}</ContactItem>
            <ContactItem icon="✉️">
              <a href={`mailto:${identity.email}`}>{identity.email}</a>
            </ContactItem>
            <ContactItem icon="📞">
              <a href={`tel:${identity.phone.replace(/\s/g,'')}`}>{identity.phone}</a>
            </ContactItem>
            {identity.github && (
              <ContactItem icon="🐙">
                <a href={identity.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </ContactItem>
            )}
            {identity.linkedin && (
              <ContactItem icon="💼">
                <a href={identity.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </ContactItem>
            )}
          </div>
        </section>

        {/* Skills */}
        <section className="sidebar-section">
          <h2 className="sidebar-section-title">Compétences</h2>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-group">
              <h3 className="skill-category">{category}</h3>
              <div className="tag-list">
                {items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Extras */}
        {extras && extras.length > 0 && (
          <section className="sidebar-section">
            <h2 className="sidebar-section-title">Engagement</h2>
            {extras.map((extra, i) => (
              <div key={i} className="extra-item">
                <div className="extra-label">
                  {extra.url
                    ? <a href={extra.url} target="_blank" rel="noopener noreferrer">{extra.label}</a>
                    : extra.label
                  }
                </div>
                <p className="extra-desc">{extra.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </aside>
  )
}
