// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AccountCreated extends ethereum.Event {
  get params(): AccountCreated__Params {
    return new AccountCreated__Params(this);
  }
}

export class AccountCreated__Params {
  _event: AccountCreated;

  constructor(event: AccountCreated) {
    this._event = event;
  }

  get caller(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _factory(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class paybox extends ethereum.SmartContract {
  static bind(address: Address): paybox {
    return new paybox("paybox", address);
  }

  createAccount(
    _tokenAddress: Address,
    _nftName: string,
    _nftSymbol: string,
    _Nfturi: string,
    _companyName: string,
    _companyLogo: string,
    _email: string
  ): boolean {
    let result = super.call(
      "createAccount",
      "createAccount(address,string,string,string,string,string,string):(bool)",
      [
        ethereum.Value.fromAddress(_tokenAddress),
        ethereum.Value.fromString(_nftName),
        ethereum.Value.fromString(_nftSymbol),
        ethereum.Value.fromString(_Nfturi),
        ethereum.Value.fromString(_companyName),
        ethereum.Value.fromString(_companyLogo),
        ethereum.Value.fromString(_email)
      ]
    );

    return result[0].toBoolean();
  }

  try_createAccount(
    _tokenAddress: Address,
    _nftName: string,
    _nftSymbol: string,
    _Nfturi: string,
    _companyName: string,
    _companyLogo: string,
    _email: string
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "createAccount",
      "createAccount(address,string,string,string,string,string,string):(bool)",
      [
        ethereum.Value.fromAddress(_tokenAddress),
        ethereum.Value.fromString(_nftName),
        ethereum.Value.fromString(_nftSymbol),
        ethereum.Value.fromString(_Nfturi),
        ethereum.Value.fromString(_companyName),
        ethereum.Value.fromString(_companyLogo),
        ethereum.Value.fromString(_email)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  showMyAcct(_owner: Address): Address {
    let result = super.call("showMyAcct", "showMyAcct(address):(address)", [
      ethereum.Value.fromAddress(_owner)
    ]);

    return result[0].toAddress();
  }

  try_showMyAcct(_owner: Address): ethereum.CallResult<Address> {
    let result = super.tryCall("showMyAcct", "showMyAcct(address):(address)", [
      ethereum.Value.fromAddress(_owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class CreateAccountCall extends ethereum.Call {
  get inputs(): CreateAccountCall__Inputs {
    return new CreateAccountCall__Inputs(this);
  }

  get outputs(): CreateAccountCall__Outputs {
    return new CreateAccountCall__Outputs(this);
  }
}

export class CreateAccountCall__Inputs {
  _call: CreateAccountCall;

  constructor(call: CreateAccountCall) {
    this._call = call;
  }

  get _tokenAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _nftName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _nftSymbol(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _Nfturi(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _companyName(): string {
    return this._call.inputValues[4].value.toString();
  }

  get _companyLogo(): string {
    return this._call.inputValues[5].value.toString();
  }

  get _email(): string {
    return this._call.inputValues[6].value.toString();
  }
}

export class CreateAccountCall__Outputs {
  _call: CreateAccountCall;

  constructor(call: CreateAccountCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}
