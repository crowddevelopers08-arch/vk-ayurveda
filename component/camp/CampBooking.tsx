import styles from "./camp.module.css";
import CampDetails from "./CampDetails";
import CampForm from "./CampForm";

export default function CampBooking() {
  return (
    <section className={styles.book} id="book">
      <div className={`${styles.wrap} ${styles.bookGrid}`}>
        <CampForm />
        <CampDetails />
      </div>
    </section>
  );
}
