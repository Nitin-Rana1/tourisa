import { FirebaseError } from "firebase/app";
import {
  DocumentData,
  getDocs,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useCollectionOnce(
  query: Query<DocumentData>
): [
  QuerySnapshot<DocumentData> | undefined,
  boolean,
  FirebaseError | undefined
] {
  const [snapshots, setSnapshots] = useState<QuerySnapshot<DocumentData>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirebaseError>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(query);
        setSnapshots(data);
      } catch (err) {
        setError(err as FirebaseError);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return [snapshots, loading, error];
}
