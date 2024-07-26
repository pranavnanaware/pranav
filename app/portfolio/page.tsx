"use client";

import React from "react";
import { Navigation } from "../components/nav";
import { LinkPreview } from "@/components/link-preview";
import { projects } from "@/app/constants/projects";

const Projects = () => {
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center min-h-screen px-4 mx-auto text-white justify-center space-y-10">
        <ul className="flex flex-col space-y-6 items-start">
          {projects.map((project, index) => (
            <LinkPreview
              key={index}
              url={project.url}
              className="font-bold scroll-m-20 border-b pb-2 text-3xl tracking-tight first:mt-0"
            >
              {project.name}{" "}
              <span className="text-neutral-400 font-thin text-lg">
                {project.techstack}
              </span>
            </LinkPreview>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
