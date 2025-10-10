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
            <Link href={post.url} className="block">
              <div className="space-y-2">
                <div className="relative h-48 w-full overflow-hidden rounded-lg">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="leading-snug font-bold">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">
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
