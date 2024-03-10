'use client'
import Link from "next/link";
import styles from "../page.module.scss";

export default function TopicCard({ topic }) {
    // Cut off the description at 200 characters
    const shortDescription = topic.description.length > 200
        ? topic.description.slice(0, 200) + '...'
        : topic.description;

    return (
        <Link href={`/topic/${topic.id}`}>
            <div className={styles.card} rel="noopener noreferrer">
                <h2>
                    {topic.name} <span>-&gt;</span>
                </h2>
                <div>
                    <img src={topic.cover_image} alt="topic photo"/>
                </div>
                <p className={styles.description}>
                    {shortDescription}
                </p>
                <p className={styles.fullDescription}>
                    {topic.description}
                </p>
            </div>
        </Link>
    );
}