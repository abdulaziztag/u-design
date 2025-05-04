import AddSquareFilled from '../../assets/icons/filled/add-square.svg';
import BookOpenFilled from '../../assets/icons/filled/book-open-01.svg';
import BriefcaseFilled from '../../assets/icons/filled/briefcase-09.svg';
import CameraFilled from '../../assets/icons/filled/camera-02.svg';
import CircleLockFilled from '../../assets/icons/filled/circle-lock-02.svg';
import DashboardSpeedFilled from '../../assets/icons/filled/dashboard-speed-02.svg';
import FuelStationFilled from '../../assets/icons/filled/fuel-station.svg';
import LicenseThirdPartyFilled from '../../assets/icons/filled/license-third-party.svg';
import MenuCircleFilled from '../../assets/icons/filled/menu-circle.svg';
import MoneyFilled from '../../assets/icons/filled/money-05.svg';
import NoteFilled from '../../assets/icons/filled/note-05.svg';
import PackageFilled from '../../assets/icons/filled/package .svg';
import PackageRemoveFilled from '../../assets/icons/filled/package-remove.svg';
import PauseFilled from '../../assets/icons/filled/pause.svg';
import PlayCircleFilled from '../../assets/icons/filled/play-circle.svg';
import UserMultipleFilled from '../../assets/icons/filled/user-multiple-02.svg';
import UserFilled from '../../assets/icons/filled/user.svg';

export const FilledIcons = {
  AddSquareFilled,
  BookOpenFilled,
  BriefcaseFilled,
  CameraFilled,
  CircleLockFilled,
  DashboardSpeedFilled,
  FuelStationFilled,
  LicenseThirdPartyFilled,
  MenuCircleFilled,
  MoneyFilled,
  NoteFilled,
  PackageFilled,
  PackageRemoveFilled,
  PauseFilled,
  PlayCircleFilled,
  UserMultipleFilled,
  UserFilled,
} as const;

export type FilledIconName = keyof typeof FilledIcons;
