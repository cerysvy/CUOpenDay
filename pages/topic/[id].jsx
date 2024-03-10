import { useRouter } from 'next/router';
import data from '../../src/app/OpenDay.json';
import Link from 'next/link';
import ProgramCard from '../../src/app/components/ProgramCard';
import styles from '../../src/app/page.module.scss';

export default function Topic() {
    const router = useRouter();

    // If the router is not ready yet, return null
    if (!router.isReady) {
        return null;
    }

    const { id } = router.query;

    // Find the topic with this id
    const topic = data.topics.find(topic => topic.id === Number(id));

    // If the topic is not found, return a 404 message
    if (!topic) {
        return <div>Topic not found</div>;
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.topicHeader}>
            <Link href="/">
                <img src="/home.svg" className={styles.homeIcon}/>
            </Link>
                {topic.name}
            </h1>
            <h3>{topic.description}</h3>
            <ProgramCard topic={topic}/>
        </div>
    );
}
