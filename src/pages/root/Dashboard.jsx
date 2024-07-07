import React from "react";
import Card from "../../components/ui/Card";
import axios from "axios";
import { ARTICLES, BASE_URL, USERS } from "../../config";
import useSWR from "swr";

const Dashboard = () => {
  const users = async () => {
    const response = await axios.get(`${BASE_URL}${USERS}/find/all`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
      withCredentials: true,
    });
    return response.data;
  };

  const articles = async () => {
    const response = await axios.get(`${BASE_URL}${ARTICLES}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
      withCredentials: true,
    });
    return response.data;
  };

  const { data: Users } = useSWR("usersAll", users);
  const { data: Articles } = useSWR("articlesAll", articles);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card title="Total Users">
          {!Users ? (
            <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-lg self-center"></div>
          ) : (
            <h3 className="text-xl sm:text-2xl font-medium text-primary">
              {Users?.data?.length}
            </h3>
          )}
        </Card>
        <Card title="Total Articles">
          {!Articles ? (
            <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-lg self-center"></div>
          ) : (
            <h3 className="text-xl sm:text-2xl font-medium text-primary">
              {Articles?.data?.length}
            </h3>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
