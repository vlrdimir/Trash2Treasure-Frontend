"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type { Post } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface NewsCarouselProps {
  posts: Post[];
}

export default function NewsCarousel({ posts }: NewsCarouselProps) {
  return (
    <>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <Link href={post.url}>
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-bold text-white">{post.title}</h3>
                  <p className="text-sm text-gray-300">
                    {format(new Date(post.date), "dd MMMM yyyy")}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
