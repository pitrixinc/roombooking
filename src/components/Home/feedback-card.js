import React from "react";
import { Typography, Card, CardBody, Avatar, Rating } from "@material-tailwind/react";

function FeedbackCard({ img, feedback, client, title }) {
  return (
    <Card shadow={false} className="items-start text-left">
      <CardBody>
        <div className="flex gap-2">
        <Avatar src={img} className="mb-2 rounded-full" alt={client} size="md" />
        <div>
        <Typography variant="h6" color="blue-gray" className="font-bold">
          {client}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mt-1 mb-5 block font-semibold"
        >
          {title}
        </Typography>
        </div>
        </div>
        <Typography
          variant="paragraph"
          className="mb-6 font-normal text-gray-500"
        >
          &quot;{feedback}&quot;
        </Typography>
        <Rating value={5} readonly className="flex text-yellow-500" />
      </CardBody>
    </Card>
  );
}

export default FeedbackCard;
