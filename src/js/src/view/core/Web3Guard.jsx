import React, {useState, useEffect} from 'react';
import TLPaper from '@material-ui/core/Paper';
import TLModal from '@material-ui/core/Modal';
import TLTypography from '@material-ui/core/Typography';
import SystemConnection from '../../bridge/SystemConnection';
import MetamaskImg from '../../../../../static/media/download-metamask.png';

const Web3Guard = ({children, getDefaultAccount}) => {
  const [hasWeb3, setHasWeb3] = useState(true);

  useEffect(() => {
    if(typeof window.ethereum === 'undefined' || typeof window.web3 === 'undefined') {
      setHasWeb3(false);
    }
    else {
      const provider = window.ethereum || window.web3.currentProvider;

      getDefaultAccount();

      provider.on('accountsChanged', () => {
        getDefaultAccount();
      });
    }
  }, []);

  const renderWeb3Alert = () => (
    <TLModal open>
      <TLPaper style={{textAlign: 'center'}}>
        <TLTypography variant='h4' gutterBottom>
          Metamask not found.
        </TLTypography>
        <TLTypography gutterBottom>
          To access your investor platform Metamask is required to be installed in your browser.
        </TLTypography>
        <a href='https://metamask.io'>
          <img src={MetamaskImg} style={{width: '30%'}}/>
        </a>
      </TLPaper>
    </TLModal>
  );

  return (
    hasWeb3
      ? children
      : renderWeb3Alert()
  );
};

export default SystemConnection(Web3Guard);
