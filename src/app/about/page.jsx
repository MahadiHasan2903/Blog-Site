import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "../../components/button/Button";

export const metadata = {
  title: "MH Dev About Information",
  description: "This is About Page",
};

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          fill={true}
          alt="About Iamge"
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Digital Storytellers</h1>
          <h2 className={styles.imgDesc}>
            Handcrafting award winning digital experiences
          </h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who Are We?</h1>
          <p className={styles.desc}>
            Welcome to our BlogPost Share, a platform for passionate writers and
            readers. We are a community of writers, bloggers, and avid readers
            who share a common love for great stories and insightful content. At
            BlogPost Share, we believe that everyone has a story to tell, and
            we&apos;re here to help you share your voice with the world.
            <br />
            <br />
            Our mission is to provide a platform where you can create, share,
            and discover amazing blog posts on a wide range of topics. Whether
            you&apos;re a seasoned writer or just starting your blogging
            journey, we&aposre here to support you every step of the way. Join
            us in this exciting adventure of creativity and knowledge sharing.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What We Do?</h1>
          <p className={styles.desc}>
            At BlogPost Share, we empower you to:
            <br />
            <br /> - Create and publish your blog posts with ease.
            <br />
            <br /> - Connect with a like-minded community of writers and
            readers.
            <br />
            <br /> - Discover engaging and thought-provoking content.
            <br />
            <br /> - Share your insights and stories with the world.
            <br />
            <br />
            Join us on this journey of creative expression and knowledge
            exchange. Whether you&apos;re a blogger, a reader, or both, BlogPost
            Share is the place to be. Get started today and start sharing your
            unique perspective with the world.
          </p>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </div>
  );
};

export default About;
