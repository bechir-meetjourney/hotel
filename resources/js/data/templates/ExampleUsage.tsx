import React from 'react'
import { getTemplateData } from '@/data/templates'

// Example of how to use the new data system
const ExampleUsage: React.FC = () => {
  // Get Riyadh template data
  const riyadhData = getTemplateData('riyadh')

  // Extract different data sections
  const { hero, rooms, services, contact, theme, stats } = riyadhData

  return (
    <div className="example-usage" dir="rtl">
      {/* Using Hero data */}
      <section style={{ backgroundColor: theme.primary, color: 'white' }}>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <p>{hero.description}</p>
        
        <div className="features">
          {hero.features.map((feature, index) => (
            <div key={index} className="feature">
              <span className="icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Using statistics */}
      <section className="stats">
        <h2>إحصائياتنا</h2>
        <div className="stats-grid">
          <div className="stat">
            <span className="number">{stats.totalRooms}</span>
            <span className="label">غرفة فاخرة</span>
          </div>
          <div className="stat">
            <span className="number">{stats.averageRating}</span>
            <span className="label">تقييم النزلاء</span>
          </div>
          <div className="stat">
            <span className="number">{stats.yearsOfExperience}</span>
            <span className="label">سنة خبرة</span>
          </div>
          <div className="stat">
            <span className="number">{stats.satisfiedGuests.toLocaleString()}</span>
            <span className="label">نزيل راضٍ</span>
          </div>
        </div>

        {/* Display awards */}
        {stats.awards && (
          <div className="awards">
            <h3>جوائزنا وشهاداتنا</h3>
            <ul>
              {stats.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Using rooms data */}
      <section className="rooms">
        <h2>غرفنا الفاخرة</h2>
        <div className="rooms-grid">
          {rooms.slice(0, 3).map((room) => (
            <div key={room.id} className="room-card">
              <img src={room.images[0]} alt={room.title} />
              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <div className="price">
                {room.price.current} {room.price.currency} / ليلة
              </div>
              <div className="amenities">
                {room.amenities.slice(0, 4).map((amenity) => (
                  <span key={amenity} className="amenity">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Using services data */}
      <section className="services">
        <h2>خدماتنا</h2>
        <div className="services-grid">
          {services.slice(0, 6).map((service) => (
            <div key={service.id} className="service-card">
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.isAvailable24h && (
                <span className="badge">متاح 24 ساعة</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Using contact information */}
      <section className="contact">
        <h2>اتصل بنا</h2>
        <div className="contact-info">
          <div className="info-item">
            <strong>الهاتف:</strong> {contact.phone}
          </div>
          <div className="info-item">
            <strong>البريد الإلكتروني:</strong> {contact.email}
          </div>
          <div className="info-item">
            <strong>العنوان:</strong> 
            {contact.address.street}, {contact.address.city}, {contact.address.country}
          </div>
          
          {/* Working hours */}
          {contact.workingHours && (
            <div className="working-hours">
              <h3>ساعات العمل</h3>
              <ul>
                <li>الاستقبال: {contact.workingHours.reception}</li>
                <li>المطعم: {contact.workingHours.restaurant}</li>
                {contact.workingHours.spa && (
                  <li>السبا: {contact.workingHours.spa}</li>
                )}
                {contact.workingHours.gym && (
                  <li>الصالة الرياضية: {contact.workingHours.gym}</li>
                )}
              </ul>
            </div>
          )}

          {/* Nearby places */}
          {contact.additionalInfo?.nearbyAttractions && (
            <div className="nearby">
              <h3>أماكن مهمة قريبة</h3>
              <ul>
                {contact.additionalInfo.nearbyAttractions.slice(0, 3).map((place, index) => (
                  <li key={index}>
                    <strong>{place.name}</strong> - {place.distance}
                    <br />
                    <small>{place.description}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ExampleUsage