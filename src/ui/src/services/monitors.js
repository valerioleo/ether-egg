import {interval} from 'rxjs';
import {concatMap, takeWhile} from 'rxjs/operators';
import {not} from '../utils/fn';
import {duration} from '../utils/helpers/time';
import {getTransactionReceipt} from '../utils/eth-utils/core/tx';

// eslint-disable-next-line import/prefer-default-export
export const listenForReceipt = txHash => interval(duration.seconds(30))
  .pipe(
    concatMap(() => getTransactionReceipt(txHash)),
    takeWhile(not, true)
  );
