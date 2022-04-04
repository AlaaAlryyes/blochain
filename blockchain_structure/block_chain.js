const { Console, clear } = require("console");
const buf = require("buffer");
const crypto = require("crypto");
const fs = require("fs");

function encrypt(str) {
  return crypto.createHash("sha256").update(str, "utf8").digest("hex");
}

function get_hash_list(list) {
  result = [];
  len = list.length;
  for (let i = 0; i < len; i++) {
    result.push(encrypt(list[i]));
  }
  return result;
}

function isEmpty(list) {
  return list.length == 0;
}

function doubleLast(list) {
  let last = list[list.length - 1];
  list.push(last);
}

function isEven(listLength) {
  if (listLength == 0) {
    return false;
  }
  return listLength % 2 == 0;
}

function combine(list) {
  let a,
    b = "";
  let result = [];

  if (!isEven(list.length) && !isEmpty(list)) {
    doubleLast(list);
  } else {
    while (list.length > 0) {
      a = list.pop();
      b = list.pop();
      result.push(encrypt(a + b));
    }
  }

  return result;
}

function build_merkle_tree(transactions) {
  transactions = get_hash_list(transactions);
  let result = "";
  let len = transactions.length;
  do {
    result = combine(transactions);
    console.log(result);
    transactions = result;
  } while (result.length > 1);
  return result;
}

let Block = {
  height: 0,
  header: {
    version: "1",
    previousHash: null,
    merkleRoot: null,
    difficulty: 0,
    timpStamp: Date.now(),
    nonce: 0,
  },
  transactionsCounter: 0,
  transactions: [],
  hash: () => {
    return encrypt(this.header);
  },
};

const chain = [];
const unconfirmedTransactions = [];

function clearArr(arr) {
  let l = arr.length;
  for (let index = 0; index < l; index++) {
    arr.pop();
  }
}

function add_block(block, proof) {
  if (is_valid_proof(block, proof)) {
    store_in_file(block);
  }
}

function proof_of_work(block) {
  var nonce = 0;
  var str = "";
  let diff = block.header.difficulty;

  while (true) {
    //cahnge the nonce and hash the header and the prevHash with the nonce
    block.header.nonce = nonce;
    str = crypto
      .createHash("sha256")
      .update(JSON.stringify(block.header))
      .digest("hex");
    if (str.substring(0, diff) == generateZeros(diff)) {
      // block.header.nonce = nonce;
      console.log("Rewarderd with  bitcons");
      console.log(str);
      let newBlock = Block;
      break;
    } else if (block.header.difficulty == 0 && str.at(0) == "0") {
      let newBlock = Block;
      console.log(str);
      break;
    } else {
      nonce += 1;
      console.log("number:" + nonce + "  " + str);
    }
  }
  return nonce;
}

function is_valid_proof(block, proof) {
  var dif = block.header.difficulty;
  block.header.nonce = proof;
  var h = crypto
    .createHash("sha256")
    .update(JSON.stringify(block.header))
    .digest("hex");
  var zeros = generateZeros(dif);
  var s = h.substring(0, dif);
  if (s == zeros) {
    return true;
  }
  return false;
}

function blockExplorer(hash) {
  
}


function add_unconfirmed_transactions_toblock(block) {
  block.transactions = unconfirmedTransactions;
  block.transactionsCounter = unconfirmedTransactions.length;
  block.header.merkleRoot = build_merkle_tree(block.transactions);
  clearArr(unconfirmedTransactions);
}

function get_last_block_height() {
  return chain[chain.length - 1].height;
}

function mine(block) {
  if (chain.length == 0) {
    chain.push(Block);
  }
  let proof = proof_of_work(block);
  add_block(block, proof);
  add_unconfirmed_transactions_toblock(block);
}

function generateZeros(numberOfZeros) {
  let str = "";
  for (let i = 0; i < numberOfZeros; i++) {
    str += "0";
  }
  return str;
}

function store_in_file(block, path) {
  const str = JSON.stringify(block);
  fs.writeFile(path, str, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}


function search_file(block,path){
  
  var data = fs.readFile(path,(err, data)=>{
    if (err) throw err;
    const blocks = JSON.parse(data);
  })

}

let t,t1,t2,t3,t4,t5,t6, t7 = "";
t = "defs";
t1 = "sdfsl;";
t2 = "sldfks;lf";
t3 = "aosjfasfl";
t4 = "lllllakakakakakak";
t5 = "23234kkkasdka";
t6 = "2394jada24234";
t7 = "@@@sdfsdf555";
let l = [];
l.push(t);
l.push(t1);
l.push(t2);
l.push(t3);
l.push(t4);
l.push(t5);
l.push(t6);
l.push(t7);

const chain_path =
  "C:\\Users\\asjr1\\Desktop\\IUG\\blockchain\\Assignments\\blockchain_structure\\chain.json";
const unconfirmed_transactions_path =
  "C:\\Users\\asjr1\\Desktop\\IUG\\blockchain\\Assignments\\blockchain_structure\\unconfirmed_tranactions.json"
  


var b = {
  height: 3,
  header: {
    version: "1",
    previousHash: null,
    merkleRoot: null,
    difficulty: 1,
    timpStamp: Date.now(),
    nonce: 0,
  },
  transactionsCounter: 0,
  transactions: [],
  hash: () => {
    return encrypt(this.header);
  },
};


store_in_file(b,chain_path)