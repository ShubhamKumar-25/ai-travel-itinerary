// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   // Input fields state
//   const [destination, setDestination] = useState("");
//   const [days, setDays] = useState("3");
//   const [budget, setBudget] = useState("Budget / Backpacking");
//   const [style, setStyle] = useState("Adventure & Exploring");

//   // App state management
//   const [itineraryData, setItineraryData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [activeDay, setActiveDay] = useState(0); // For handling current day tab

//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     if (!destination.trim()) return alert("Please enter a destination!");

//     setLoading(true);
//     setItineraryData(null); // Purana data clear karne ke liye
//     setActiveDay(0); // Tab default day 1 par reset karne ke liye

//     try {
//       // Local backend target (Production ke waqt is url ko change karenge)
//       const response = await axios.post(
//         "http://localhost:5000/api/generate-itinerary",
//         {
//           destination,
//           days: parseInt(days),
//           budget,
//           style,
//         },
//       );

//       if (response.data.success) {
//         setItineraryData(response.data.data);
//       }
//     } catch (error) {
//       console.error("Frontend Error:", error);
//       alert(
//         "Failed to build itinerary. Please ensure backend server is running.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>🌍 AI Personalized Travel Planner</h1>

//       {/* Input Form Card */}
//       <div className="form-card">
//         <form onSubmit={handleGenerate}>
//           <div className="form-grid">
//             <div className="form-group">
//               <label>Where do you want to go?</label>
//               <input
//                 type="text"
//                 placeholder="e.g. Manali, Goa, Paris"
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>For how many days?</label>
//               <select value={days} onChange={(e) => setDays(e.target.value)}>
//                 <option value="1">1 Day</option>
//                 <option value="3">3 Days</option>
//                 <option value="5">5 Days</option>
//                 <option value="7">7 Days</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>What's your budget style?</label>
//               <select
//                 value={budget}
//                 onChange={(e) => setBudget(e.target.value)}
//               >
//                 <option value="Budget / Backpacking">
//                   💸 Economy / Backpacking
//                 </option>
//                 <option value="Mid-Range Comfort">🚗 Mid-Range Comfort</option>
//                 <option value="Luxury / Premium">🏨 Luxury / Premium</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Travel Style</label>
//               <select value={style} onChange={(e) => setStyle(e.target.value)}>
//                 <option value="Adventure & Exploring">
//                   🚀 Adventure & Exploring
//                 </option>
//                 <option value="Relaxed & Leisure">☕ Relaxed & Leisure</option>
//                 <option value="Family Friendly">👨‍👩‍👧 Family Friendly</option>
//                 <option value="Solo Traveler Mode">
//                   🎒 Solo Traveler Mode
//                 </option>
//               </select>
//             </div>
//           </div>

//           <button type="submit" className="btn-submit" disabled={loading}>
//             {loading
//               ? "AI is planning your perfect trip... 🗺️✨"
//               : "Generate Custom Itinerary"}
//           </button>
//         </form>
//       </div>

//       {/* Output Render Card */}
//       {itineraryData && (
//         <div className="result-card">
//           <h2>
//             🎉 Your Custom Plan for {itineraryData.tripSummary.destination}
//           </h2>

//           <div className="summary-badges">
//             <span className="badge">
//               ⏱️ {itineraryData.tripSummary.duration}
//             </span>
//             <span className="badge">🎒 {itineraryData.tripSummary.style}</span>
//             <span className="badge">
//               💳 {itineraryData.tripSummary.budgetCategory}
//             </span>
//             <span className="badge cost">
//               💰 Est: {itineraryData.tripSummary.estimatedTotalCostEstimate}
//             </span>
//           </div>

//           {/* Dynamic Day Selector Tabs */}
//           <div className="day-buttons">
//             {itineraryData.itinerary.map((dayPlan, index) => (
//               <button
//                 key={index}
//                 className={`day-btn ${activeDay === index ? "active" : ""}`}
//                 onClick={() => setActiveDay(index)}
//               >
//                 Day {dayPlan.day}
//               </button>
//             ))}
//           </div>

//           {/* Active Day Content */}
//           <div className="day-content">
//             <h3>
//               ✨ Day {itineraryData.itinerary[activeDay].day}:{" "}
//               {itineraryData.itinerary[activeDay].theme}
//             </h3>

//             <p>
//               <strong>What you will do:</strong>
//             </p>
//             <ul className="activities-list">
//               {itineraryData.itinerary[activeDay].activities.map(
//                 (activity, i) => (
//                   <li key={i}>{activity}</li>
//                 ),
//               )}
//             </ul>

//             <p style={{ marginTop: "15px" }}>
//               🍽️ <strong>Food Suggestion:</strong>{" "}
//               {itineraryData.itinerary[activeDay].foodSuggestions}
//             </p>
//           </div>

//           {/* Special Travel Tips generated by AI */}
//           <div className="tips-section">
//             <h3>💡 Pro AI Travel Tips:</h3>
//             <ul className="tips-list">
//               {itineraryData.travelTips.map((tip, index) => (
//                 <li key={index}>{tip}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("Budget / Backpacking");
  const [style, setStyle] = useState("Adventure & Exploring");

  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeDay, setActiveDay] = useState(0);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return alert("Please enter a destination!");

    setLoading(true);
    setItineraryData(null);
    setActiveDay(0);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-itinerary",
        {
          destination,
          days: parseInt(days),
          budget,
          style,
        },
      );

      if (response.data.success) {
        setItineraryData(response.data.data);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert(
        "Failed to build itinerary. Please ensure backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>
        <span class="earth">🌍</span> AI Personalized Travel Planner
      </h1>

      {/* Form Card */}
      <div className="form-card">
        <form onSubmit={handleGenerate}>
          <div className="form-grid">
            <div className="form-group">
              <label>Where do you want to go?</label>
              <input
                type="text"
                placeholder="e.g. Manali, Goa, Paris"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>For how many days?</label>
              <select value={days} onChange={(e) => setDays(e.target.value)}>
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="5">5 Days</option>
                <option value="7">7 Days</option>
              </select>
            </div>

            <div className="form-group">
              <label>What's your budget style?</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="Budget / Backpacking">
                  💸 Economy / Backpacking
                </option>
                <option value="Mid-Range Comfort">🚗 Mid-Range Comfort</option>
                <option value="Luxury / Premium">🏨 Luxury / Premium</option>
              </select>
            </div>

            <div className="form-group">
              <label>Travel Style</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                <option value="Adventure & Exploring">
                  🚀 Adventure & Exploring
                </option>
                <option value="Relaxed & Leisure">☕ Relaxed & Leisure</option>
                <option value="Family Friendly">👨‍👩‍👧 Family Friendly</option>
                <option value="Solo Traveler Mode">
                  🎒 Solo Traveler Mode
                </option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading
              ? "AI is curating an ultra-detailed blueprint... 🗺️✨"
              : "Generate Rich Itinerary"}
          </button>
        </form>
      </div>

      {/* Results Display */}
      {itineraryData && (
        <div className="result-card">
          <h2>
            🎉 Exploration Blueprint for {itineraryData.tripSummary.destination}
          </h2>

          <p
            style={{ color: "#94a3b8", lineHeight: "1.6", fontStyle: "italic" }}
          >
            {itineraryData.tripSummary.aboutDestination}
          </p>

          <div className="summary-badges">
            <span className="badge">
              ⏱️ {itineraryData.tripSummary.duration}
            </span>
            <span className="badge">🎒 {itineraryData.tripSummary.style}</span>
            <span className="badge">
              💳 {itineraryData.tripSummary.budgetCategory}
            </span>
            <span className="badge cost">
              💰 Total {itineraryData.tripSummary.estimatedTotalCostEstimate}
            </span>
          </div>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#38bdf8",
              marginBottom: "25px",
            }}
          >
            📅 <strong>Best Time to Visit:</strong>{" "}
            {itineraryData.tripSummary.bestTimeToVisit}
          </p>

          {/* Day Selection Tabs */}
          <div className="day-buttons">
            {itineraryData.itinerary.map((dayPlan, index) => (
              <button
                key={index}
                className={`day-btn ${activeDay === index ? "active" : ""}`}
                onClick={() => setActiveDay(index)}
              >
                Day {dayPlan.day}
              </button>
            ))}
          </div>

          {/* Upgraded Day Plan Grid */}
          <div className="day-content">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: 0 }}>
                ✨ Day {itineraryData.itinerary[activeDay].day}:{" "}
                {itineraryData.itinerary[activeDay].theme}
              </h3>
              <span
                style={{
                  color: "#4ade80",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}
              >
                💵 Day Budget: {itineraryData.itinerary[activeDay].dayBudget}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ color: "#f59e0b", fontWeight: "bold" }}>
                  🌅 Morning:
                </span>
                <p
                  style={{
                    margin: "6px 0 0 0",
                    color: "#cbd5e1",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                  }}
                >
                  {itineraryData.itinerary[activeDay].timeSlots.morning}
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ color: "#38bdf8", fontWeight: "bold" }}>
                  ☀️ Afternoon:
                </span>
                <p
                  style={{
                    margin: "6px 0 0 0",
                    color: "#cbd5e1",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                  }}
                >
                  {itineraryData.itinerary[activeDay].timeSlots.afternoon}
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "12px 16px",
                  borderRadius: "8px",
                }}
              >
                <span style={{ color: "#a855f7", fontWeight: "bold" }}>
                  🌌 Evening/Night:
                </span>
                <p
                  style={{
                    margin: "6px 0 0 0",
                    color: "#cbd5e1",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                  }}
                >
                  {itineraryData.itinerary[activeDay].timeSlots.evening}
                </p>
              </div>
            </div>

            <p
              style={{
                marginTop: "20px",
                padding: "10px",
                borderTop: "1px dashed #334155",
              }}
            >
              🍽️ <strong>Food Guide for today:</strong>{" "}
              {itineraryData.itinerary[activeDay].foodSuggestions}
            </p>
          </div>

          {/* Travel Tips Section */}
          <div className="tips-section">
            <h3>💡 Strategic Travel Hacks:</h3>
            <ul className="tips-list">
              {itineraryData.travelTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
