class User {
  private _userInfo: any;

  constructor(data: any) {
    this.userInfo =
    {
      userId: data.userId,
      userName: data.userName,
      nickName: data.nickName,
      avatar: data.avatar,
      sex: data.gender,
      phone: data.phoneNumber,
      identityCard: data.identityCard,
      nation: data.nation,
      ancestral: data.ancestral,
      background: data.background,
      email: data.email,
    }
  }

  set userInfo(val) {
    this._userInfo = val;
  }

  get userInfo(): any {
    return this._userInfo;
  }
}

export default User;
