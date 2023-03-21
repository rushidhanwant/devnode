import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import NewThread from "../components/Thread/NewThread";
import ThreadCard from "../components/ThreadCard";
import { useAccount } from "wagmi";
import { trpc } from "../utils/trpc";
import { Modal } from "../components/Modal";
import { useAppSelector } from "../store";

const Home: NextPage = () => {
  const communityId = useAppSelector(
    (state) => state.community.selectedCommunity
  );
  const threads = trpc.public.fetchAllCommunityThreads.useQuery({
    communityId,
  });

  const didSession = useAppSelector((state) => state.user.didSession);

  const { isConnected } = useAccount();
  const [isDidSession, setDidSession] = useState(didSession ? true : false);
  const [isDiscordUser, setDiscordUser] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (threads.data && threads.data?.length >= 0) {
      setLoading(false);
    }
  }, [threads]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDidSession = (value) => {
    setDidSession(value);
  };
  const handleDiscordUser = (value) => {
    setDiscordUser(value);
  };

  const handleClick = () => {
    setOpen((state) => !state);
  };

  const checkConnected = () => {
    if (!isConnected)
      return (
        <div className="flex w-full justify-center bg-white py-6">
          <div className=" bg-white text-base font-normal text-gray-700">
            Please connect to publish comments.
          </div>
        </div>
      );

    if (!isDidSession)
      return (
        <div className="flex w-full justify-center bg-white py-6">
          <div className=" bg-white text-base font-normal text-gray-700">
            Please create a DID session
          </div>
        </div>
      );

    if (!isDiscordUser)
      return (
        <div className="flex w-full justify-center bg-white py-6">
          <div
            className=" cursor-pointer bg-white text-base font-normal text-gray-700"
            onClick={handleClick}
          >
            Please connect to Discord
          </div>
        </div>
      );
  };

  return (
    <Layout
      handleDiscordUser={handleDiscordUser}
      handleDidSession={handleDidSession}
    >
      <main className="h-full">
        <div className="pt-[50px]">
          <div className="space-y-[50px] border-b border-gray-200 pb-5 sm:pb-0">
            <div className="text-[48px] font-medium text-[#08010D]">
              Discover
            </div>
          </div>
          <div className="flex flex-col space-y-[36px] py-[40px]">
            {threads.data &&
              threads.data.map((thread) => (
                <ThreadCard key={thread.node.id} thread={thread.node} />
              ))}
          </div>
        </div>
      </main>
      {isOpen && <Modal handleClick={handleClick} />}
    </Layout>
  );
};

export default Home;
