'use client'
// import Link from "next/link";
import { useState } from "react";
import styles from "../page.module.scss";

export default function ProgramCard({ topic }) {

    const [selectedProgram, setSelectedProgram] = useState(null);

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
    
        return `${formattedStartDate}, ${formattedStartTime}-${formattedEndTime}`;
    }

    return (
        <div className={styles.grid}>
            {topic.programs.map((program, index) => {
                const [isHovered, setIsHovered] = useState(false);
                const [isButtonHovered, setIsButtonHovered] = useState(false);
                return (
                    <div
                        key={index}
                        className={styles.card}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        rel="noopener noreferrer"
                    >
                        <h2>
                            {program.title} <span>-&gt;</span>
                        </h2>
                        <p>
                            {isHovered ? program.description : program.description_short}
                        </p>
                        <div className={styles.infoContainer}>
                            <div className={styles.tagContainer}>
                                <img src="/tag-icon.svg" className={styles.tagIcon}/>
                                <h4>{program.programType.type}</h4>
                            </div>
                            <button className={styles.timeButton}
                                    onMouseEnter={() => setIsButtonHovered(true)}
                                    onMouseLeave={() => setIsButtonHovered(false)}>                       
                                <img src="/time.svg" className={styles.timeIcon}/>
                                {isButtonHovered && <div className={styles.tooltip}>
                                <p>{convertDate(program.start_time, program.end_time)}</p>       
                                </div>}
                            </button>
                            <button className={styles.locationButton}
                                    onClick={() => setSelectedProgram(program)}>
                                <img src="/location.svg" className={styles.locationIcon}/>
                            </button>
                        </div>            
                    </div>
                );
            })}

            {selectedProgram && (
                <div className={styles.modal}>
                    <div className={styles.modalDiv}>
                        <div className={styles.modalHeader}>
                            <a href={selectedProgram.location.website} target="_blank"><h2>{selectedProgram.location.title}</h2></a>
                            <button className={styles.closeButton} onClick={() => setSelectedProgram(null)}>
                                <img src="/close.svg"/>
                            </button>
                        </div>
                        <div className={styles.modalText}>
                            <a href={selectedProgram.location.website} target="_blank"><img src={selectedProgram.location.cover_image} className={styles.locationImage}/></a>
                            <p>{selectedProgram.floor} </p>
                            <p>{selectedProgram.room}, {selectedProgram.location.title}, {selectedProgram.location.address}, {selectedProgram.location.postcode}</p>
                            <h4>Building description</h4>
                            <p>{selectedProgram.location.description}</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
  }



// location icon (hover -> room, floor, location LINK)
