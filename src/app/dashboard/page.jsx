"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === "authenticated") {
          const response = await fetch(
            `/api/posts?username=${session?.data?.user.name}`
          );
          if (response.ok) {
            const postData = await response.json();
            setData(postData);
          } else {
            setError("Failed to fetch data");
          }
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session]);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      const newData = data.filter((post) => post._id !== id);
      setData(newData);
      toast.success("Post deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete the post.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    // Validate input values
    const trimmedTitle = title.trim();
    const trimmedDesc = desc.trim();
    const trimmedImg = img.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle && trimmedDesc && trimmedImg && trimmedContent) {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: trimmedTitle,
            desc: trimmedDesc,
            img: trimmedImg,
            content: trimmedContent,
            username: session.data.user.name,
          }),
        });

        if (response.status !== 201) {
          throw new Error("Failed to add a new post");
        } else {
          const newPost = await response.json();
          setData([newPost, ...data]);

          e.target.reset();

          toast.success("Post created successfully!");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while adding a new post.");
      }
    } else {
      toast.error("Please fill in all fields before submitting.");
    }
  };

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
    return null;
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          <p className={styles.title}>Your Posts</p>
          {isLoading
            ? "Loading..."
            : data && data.length > 0
            ? data.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    <MdDeleteForever size={25} />
                  </span>
                </div>
              ))
            : "You haven't posted anything yet."}
        </div>

        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input
            type="text"
            placeholder="Description"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Image (url)"
            className={styles.input}
          />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
