/**
 * Card Section - CSS Card Display
 * 
 * قسم جديد لعرض كرت باستخدام مكون RoomsCard الخاص بقالب المدينة
 * New section to display card using RoomsCard component from Madina Template
 */
import React from 'react'
import RoomsCard from '../Rooms/RoomsCard'

export default function CardSection() {
  return (
    <section 
      id="card-section" 
      className="py-20"
      style={{
        backgroundColor: '#FF0000', // Temporary red background
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Madina template RoomsCard component */}
          <RoomsCard
            width={504}
            height={694}
            backgroundColor="white"
            borderColor="black"
            borderWidth="1px"
          >
            {/* Card content can be added here */}
          </RoomsCard>
        </div>
      </div>
    </section>
  )
}

