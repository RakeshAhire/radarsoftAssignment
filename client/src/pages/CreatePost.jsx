import React from "react";

const CreatePost = () => {
  return (
    <div className="container mx-auto">
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="text-4xl font-bold">Title</h1>
          <p className="text-gray-600">Description</p>
          <div className="flex items-center gap-4">
            <image
              src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="author"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-gray-800">UserName</span>
          </div>
        </div>
        <div className="flex-1">
          <image
            alt="author"
            fill={true}
            className="w-full h-64 object-cover rounded-l-lg"
          />
        </div>
      </div>
      <div className="mt-8 text-lg text-gray-700">
        <p>Content</p>
      </div>
    </div>
  );
};

export default CreatePost;
