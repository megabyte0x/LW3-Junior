import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Web3Provider } from "@ethersproject/providers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { useViewerConnection, useViewerRecord } from "@self.id/react";
import { EthereumAuthProvider } from "@self.id/web";



function RecordSetter() {
  const record = useViewerRecord("basicProfile");
  const updateRecordName = async (_name) => {
    await record.merge({
      name: _name
    });
  };

  const [name, setName] = useState("");

  return (
    <div className={styles.content}>
      <div classname={styles.mt2}>
        {
          record.content ?
            (
              <div className={styles.flexCol}>
                <span className={styles.subtitle}>
                  Hello {record.content.name}!
                </span>
                <span>
                  The above name was loaded from Ceramic Network. Try updating it
                  below.
                </span>
              </div>
            )
            :
            (
              <span>
                You do not have a profile record attached to your 3ID. Create a basic
                profile by setting a name below.
              </span>
            )
        }
      </div>
      <input
        type="text"
        placeHolder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.mt2}
      />
      <button onClick={() => updateRecordName(name)}> Update</button>
    </div>
  );
}

export default function Home() {

  const web3ModalRef = useRef();
  const [connection, connect, disconnect] = useViewerConnection();


  const getProvider = async () => {
    const provider = await web3ModalRef.current.connect();
    const wrappedProvider = new Web3Provider(provider);
    return wrappedProvider;
  };

  const connectToSelfID = async () => {
    const ethereumAuthProvider = await getEthereumAuthProvider();
    connect(ethereumAuthProvider);
  }

  const getEthereumAuthProvider = async () => {
    const wrappedProvider = await getProvider();
    const signer = wrappedProvider.getSigner();
    const address = await signer.getAddress();
    return new EthereumAuthProvider(wrappedProvider.provider, address);
  }

  useEffect(() => {
    if (connection.status !== "connected") {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [connection.status]);

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <span className={styles.title}>Ceramic Practice</span>
        {
          connection.status === "connected" ?
            (
              <span className={styles.subtitle}>
                Connected
              </span>
            ) :
            (
              <button
                onClick={connectToSelfID}
                className={styles.button}
                disabled={connection.status == "connecting"}
              >
                Connect
              </button>
            )
        }
      </div>
      <div className={styles.content}>
        <div className={styles.connection}>
          {
            connection.status == "connected" ?
              (
                <div>
                  <span className={styles.subtitle}>
                    Your 3ID is {connection.selfID.id}
                  </span>
                  <RecordSetter />
                </div>
              )
              :
              (
                <span className={styles.subtitle}>
                  Connect with your wallet to access your 3ID
                </span>
              )
          }
        </div>
      </div>
    </div>
  );
}
