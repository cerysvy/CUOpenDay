'use client'
import styles from "./page.module.scss";
import data from "./OpenDay.json";
import TopicCard from "./components/TopicCard";
import { useState } from "react";

export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTopics = data.topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function convertDate(startDateStr, endDateStr) {
    const startDateObj = new Date(startDateStr);
    const endDateObj = new Date(endDateStr);

    const formattedStartDate = startDateObj.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const formattedStartTime = startDateObj.toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedEndTime = endDateObj.toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return `${formattedStartDate}, ${formattedStartTime} - ${formattedEndTime}`;
}


  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <img
          className={styles.logo}
          src="/cardiff.avif"
          alt="Cardiff"
          width={1100}
          height={533}
        />
        <div className={styles.overlay}>
          <img src="/CardiffUniLogo.png" className={styles.uniLogo}/>
          <div className={styles.textOverlay}>
            <h1>{data.description}</h1>
            <h1>{convertDate(data.start_time, data.end_time)}</h1>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
        <div className={styles.grid}>
            {filteredTopics.map((topic, index) => (
                <TopicCard key={index} topic={topic} />
            ))}
        </div>
    </main>
  );
}
