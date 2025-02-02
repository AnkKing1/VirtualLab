import React from "react";
import ActiveLabsSection from "../components/ActiveLabSection";
import Announcements from "../components/Announcements";
import UpcomingLabsSection from "../components/UpcomingLabsSection";
import CompletedLabsSection from "../components/CompletedLabsSection";
import Footer from "../components/Footer";
import StudentNavbar from "../components/Dashboard/StudentNavbar";
const StudentDashboard = () => {
  return (
    <div>
      <div>
        <StudentNavbar/>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {/* Active Labs Section */}
          <ActiveLabsSection />
        </div>
        <div className="col-span-1">
          {/* Placeholder for future sections */}
          <div className="p-4 bg-gray-200 rounded-lg shadow">
            <Announcements />
          </div>
        </div>
        <div className="col-span-3">
          <UpcomingLabsSection />
        </div>
        <div className="col-span-3">
          <CompletedLabsSection />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
