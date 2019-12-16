export interface Profile {
    Uid: string;
    Name: string;
    Password: string;
    Wechat: string;
    Mobile: string;
    Email: string;
    Sfzhm: string;
    Sex: number;
    Type: number;
    Datebirth: any;
    Create_time: any;
    Modify_time: any;
    Address: string;
    Avatar: string;
    Logintype: number;
}

export interface PasswordUpdater {
    old_password: string
    new_password: string
}
