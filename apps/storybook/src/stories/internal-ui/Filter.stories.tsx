import {
  Filter,
  FilterOnChangeParams,
  FilterProps,
  FilterSelectOptions,
  FilterToggleOption,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { default as selectMeta } from './Select/Select.stories';

const { label, popoverOption, disabled, className } = selectMeta.argTypes;

const meta = {
  title: 'core/internal-ui/Filter',
  component: Filter,
  argTypes: {
    label,
    disabled,
    popoverOption,
    className,
    toggleValues: {
      description: 'Filter toggle values',
      table: {
        type: {
          summary: 'FilterOptionKey[] | null',
        },
      },
    },
    toggleOptions: {
      description: 'Filter toggle options',
      type: { name: 'other', value: 'FilterToggleOption[]', required: true },
      table: {
        type: {
          summary: 'FilterToggleOption[]',
        },
      },
    },
    selectValues: {
      description: 'Filter select values',
      table: {
        type: {
          summary:
            'Record<FilterOptionKey,FilterSelectOption["value"][] | null> | null',
        },
      },
    },
    selectOptions: {
      description: 'Filter select options',
      type: { name: 'other', value: 'FilterSelectOptions[]', required: true },
      table: {
        type: {
          summary: 'FilterSelectOptions[]',
        },
      },
    },
    onChange: {
      description: 'Filter onChange',
      type: { name: 'function', required: true },
    },
  },
} satisfies Meta<typeof Filter>;

export default meta;

type Story = StoryObj<typeof Filter>;

const filterOptions = [
  {
    displayValue: '담당자',
    value: 'assigned_to',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '강준영(플랫폼팀)',
        value: 'steve@bbodek.com',
      },
      {
        displayValue: '김지혜(플랫폼팀)',
        value: 'jeje@bbodek.com',
      },
      {
        displayValue: '임은서(퇴사)',
        value: 'sorhdit@bbodek.com',
      },
      {
        displayValue: '양승민(영업전략팀)',
        value: 'william@bbodek.com',
      },
      {
        displayValue: '김고은(퇴사)',
        value: 'gekl99@bbodek.com',
      },
      {
        displayValue: '박진주(플랫폼팀)',
        value: 'jj.park@bbodek.com',
      },
      {
        displayValue: '구본일(퇴사)',
        value: 'benjamin@bbodek.com',
      },
      {
        displayValue: '이준호(플랫폼팀)',
        value: 'juno@bbodek.com',
      },
      {
        displayValue: '김나현(퇴사)',
        value: 'officehyun123@bbodek.com',
      },
      {
        displayValue: '연영모(영업본부)',
        value: 'james@bbodek.com',
      },
      {
        displayValue: '정유주(퇴사)',
        value: 'yuju_jeong@bbodek.com',
      },
      {
        displayValue: '장문기(퇴사)',
        value: 'mgjang@bbodek.com',
      },
      {
        displayValue: '나재욱(영업팀)',
        value: 'jaeuk_na@bbodek.com',
      },
      {
        displayValue: '이준우(영업팀)',
        value: 'lee_junwoo@bbodek.com',
      },
      {
        displayValue: '이수환(퇴사)',
        value: 'hwan4998@bbodek.com',
      },
      {
        displayValue: '유준호(영업팀)',
        value: 'dbwnsghrk@bbodek.com',
      },
      {
        displayValue: '김정민(운영본부)',
        value: 'jm@bbodek.com',
      },
      {
        displayValue: '이애련(퇴사)',
        value: 'arlovlee724@bbodek.com',
      },
      {
        displayValue: '기보헌(서비스운영팀)',
        value: 'bohun.ki@bbodek.com',
      },
      {
        displayValue: '정승호(퇴사)',
        value: 'jshlotto@bbodek.com',
      },
      {
        displayValue: '이민우(퇴사)',
        value: 'dlalsdn432@bbodek.com',
      },
      {
        displayValue: '지영은(퇴사)',
        value: 'zoe.ji@bbodek.com',
      },
      {
        displayValue: '조성윤(서비스운영팀)',
        value: 'sungyuncho@bbodek.com',
      },
      {
        displayValue: '손요한(영업팀)',
        value: 'syh0208@bbodek.com',
      },
      {
        displayValue: '김신우(영업팀)',
        value: 'swkim@bbodek.com',
      },
      {
        displayValue: '신종현(영업팀)',
        value: 'qwas1472@bbodek.com',
      },
      {
        displayValue: '정희철(영업팀)',
        value: 'gmlcjf7846@bbodek.com',
      },
      {
        displayValue: '장성(화성팩토리팀)',
        value: 'suchang@bbodek.com',
      },
      {
        displayValue: '김주환(퇴사)',
        value: 'kjh96@bbodek.com',
      },
      {
        displayValue: '표성민(퇴사)',
        value: 'pyo@bbodek.com',
      },
      {
        displayValue: '심은화(서비스운영팀)',
        value: 'ehdgodjssl@bbodek.com',
      },
      {
        displayValue: '이유진(영업팀)',
        value: 'eugene@bbodek.com',
      },
      {
        displayValue: '오대준(퇴사)',
        value: 'deain95@bbodek.com',
      },
      {
        displayValue: '오지수(퇴사)',
        value: 'dhwltn@bbodek.com',
      },
      {
        displayValue: '전세은(퇴사)',
        value: 'seeun3456@bbodek.com',
      },
      {
        displayValue: '전승호(영업팀)',
        value: 'jce0502@bbodek.com',
      },
      {
        displayValue: '양준우(퇴사)',
        value: 'junu@bbodek.com',
      },
      {
        displayValue: '정휘영(퇴사)',
        value: 'hy.jung@bbodek.com',
      },
      {
        displayValue: '이민혁(영업팀)',
        value: 'illill9@bbodek.com',
      },
      {
        displayValue: '유형태(퇴사)',
        value: 'yooht@bbodek.com',
      },
      {
        displayValue: '장여원(CEOStaff)',
        value: 'yw.jang@bbodek.com',
      },
      {
        displayValue: '백정현(퇴사)',
        value: 'junghyun@bbodek.com',
      },
      {
        displayValue: '임대웅(화성팩토리팀)',
        value: 'unldw@bbodek.com',
      },
      {
        displayValue: '전다미(운영본부)',
        value: 'jeondami@bbodek.com',
      },
      {
        displayValue: '김지민(영업팀)',
        value: 'jimin_kim@bbodek.com',
      },
      {
        displayValue: '김진오(퇴사)',
        value: 'JINO@bbodek.com',
      },
      {
        displayValue: '심창우(퇴사)',
        value: 'felix@bbodek.com',
      },
      {
        displayValue: '전재억(채권팀)',
        value: 'jarukjeon@bbodek.com',
      },
      {
        displayValue: '이주영(서비스운영팀)',
        value: 'lee.juyoung@bbodek.com',
      },
      {
        displayValue: '심은정(퇴사)',
        value: 'dwtla16@bbodek.com',
      },
      {
        displayValue: '문기동(퇴사)',
        value: 'kdmoon@bbodek.com',
      },
      {
        displayValue: '박노준(Board)',
        value: 'pnjune@bbodek.com',
      },
      {
        displayValue: '홍성준(광명팩토리팀)',
        value: 'wangja133@bbodek.com',
      },
      {
        displayValue: '김용진(생산&물류총괄)',
        value: 'dydwls4882@bbodek.com',
      },
      {
        displayValue: '전종우(퇴사)',
        value: 'wjswhddnek@bbodek.com',
      },
      {
        displayValue: '박예찬(광명팩토리팀)',
        value: 'evan@bbodek.com',
      },
      {
        displayValue: '라힘찬(운송관리팀)',
        value: 'hcra@bbodek.com',
      },
      {
        displayValue: '이성우(광명팩토리팀)',
        value: 'bbodeklove@bbodek.com',
      },
      {
        displayValue: '정연홍(운송관리팀)',
        value: 'deoksong@bbodek.com',
      },
      {
        displayValue: '박가영(퇴사)',
        value: 'gayoung02@bbodek.com',
      },
      {
        displayValue: '태경재(Board)',
        value: 'taegoon@bbodek.com',
      },
      {
        displayValue: '이상훈(대표그룹지정필요)',
        value: 'lsh484@bbodek.com',
      },
      {
        displayValue: '김영효(퇴사)',
        value: 'younghyo@bbodek.com',
      },
      {
        displayValue: '박현민(운영본부)',
        value: 'hyunmin.park@bbodek.com',
      },
      {
        displayValue: '박경탁(물류관리팀)',
        value: 'gtpark@bbodek.com',
      },
      {
        displayValue: '김미림(퇴사)',
        value: 'mirimk@bbodek.com',
      },
      {
        displayValue: '임서현(퇴사)',
        value: 'imseohyunim@bbodek.com',
      },
      {
        displayValue: '김동빈(퇴사)',
        value: 'kdb1175@bbodek.com',
      },
      {
        displayValue: '임수정(재무회계팀)',
        value: '1214ejs@bbodek.com',
      },
      {
        displayValue: '이창현(퇴사)',
        value: 'lee2002sin@bbodek.com',
      },
      {
        displayValue: '채강석(화성팩토리팀)',
        value: 'corkdtjr@bbodek.com',
      },
      {
        displayValue: '김종목(물류관리팀)',
        value: 'jongmock0803@bbodek.com',
      },
      {
        displayValue: '문은주(퇴사)',
        value: 'ejmoon505@bbodek.com',
      },
      {
        displayValue: '조성민(퇴사)',
        value: 'sungmin8548@bbodek.com',
      },
      {
        displayValue: '이정민(퇴사)',
        value: 'jm05030@bbodek.com',
      },
      {
        displayValue: '김효빈(퇴사)',
        value: 'kimhb05@bbodek.com',
      },
      {
        displayValue: '김현정(퇴사)',
        value: 'guswjd4204@bbodek.com',
      },
      {
        displayValue: '송상화(운송관리팀)',
        value: 'huhussh@bbodek.com',
      },
      {
        displayValue: '민현주(운송관리팀)',
        value: 'mhj990319@bbodek.com',
      },
      {
        displayValue: '박서현(퇴사)',
        value: 'sdff123@bbodek.com',
      },
      {
        displayValue: '김동헌(퇴사)',
        value: 'Dhkim@bbodek.com',
      },
      {
        displayValue: '유미래(퇴사)',
        value: 'mr.yoo@bbodek.com',
      },
      {
        displayValue: '김정린(퇴사)',
        value: 'jr.kim@bbodek.com',
      },
      {
        displayValue: '김승훈(광명팩토리팀)',
        value: 'sh.kim@bbodek.com',
      },
      {
        displayValue: '이은서(재무회계팀)',
        value: 'es.lee@bbodek.com',
      },
      {
        displayValue: '김다해(퇴사)',
        value: 'dh.kim@bbodek.com',
      },
      {
        displayValue: '이상원(광명팩토리팀)',
        value: 'sw.lee@bbodek.com',
      },
      {
        displayValue: '이용혁(재무회계팀)',
        value: 'lyh@bbodek.com',
      },
      {
        displayValue: '이훈(스마트팩토리팀)',
        value: 'dlgns8z@bbodek.com',
      },
      {
        displayValue: '나승재(광명팩토리팀)',
        value: 'sh.ra@bbodek.com',
      },
      {
        displayValue: '진영호(퇴사)',
        value: 'yh.jin@bbodek.com',
      },
      {
        displayValue: '추유선(플랫폼팀)',
        value: 'ys.choo@bbodek.com',
      },
      {
        displayValue: '권유리(퇴사)',
        value: 'yr.kwon@bbodek.com',
      },
      {
        displayValue: '박정호(영업팀)',
        value: 'jh.park@bbodek.com',
      },
      {
        displayValue: '최현수(퇴사)',
        value: 'hs.choi@bbodek.com',
      },
      {
        displayValue: '장혜정(퇴사)',
        value: 'hj.jang@bbodek.com',
      },
      {
        displayValue: '김재성(운송관리팀)',
        value: 'kimjaesung@bbodek.com',
      },
      {
        displayValue: '표승민(영업전략팀)',
        value: 'sm.pyo@bbodek.com',
      },
      {
        displayValue: '정영은(대표그룹지정필요)',
        value: 'yejung@bbodek.com',
      },
      {
        displayValue: '신주용(플랫폼팀)',
        value: 'jy.shin@bbodek.com',
      },
      {
        displayValue: '김태형(퇴사)',
        value: 'th.kim@bbodek.com',
      },
      {
        displayValue: '최종섭(퇴사)',
        value: 'js.choi@bbodek.com',
      },
      {
        displayValue: '최연(퇴사)',
        value: 'y.choi@bbodek.com',
      },
      {
        displayValue: '박여진(서비스운영팀)',
        value: 'yj.park@bbodek.com',
      },
      {
        displayValue: '최성호(채권팀)',
        value: 'sh.choi@bbodek.com',
      },
      {
        displayValue: '이동석(스마트팩토리팀)',
        value: 'movingstone@bbodek.com',
      },
      {
        displayValue: '이지연(재무회계팀)',
        value: 'jy.lee@bbodek.com',
      },
      {
        displayValue: '송민재(서비스운영팀)',
        value: 'mj.song@bbodek.com',
      },
      {
        displayValue: '김나윤(서비스운영팀)',
        value: 'ny.kim@bbodek.com',
      },
      {
        displayValue: '이승호(영업팀)',
        value: 'sh.lee@bbodek.com',
      },
      {
        displayValue: '원주연(플랫폼팀)',
        value: 'jy.won@bbodek.com',
      },
      {
        displayValue: '문가을(대표그룹지정필요)',
        value: 'ge.mun@bbodek.com',
      },
      {
        displayValue: '전인표(대표그룹지정필요)',
        value: 'ip.jeon@bbodek.com',
      },
      {
        displayValue: '허역원(대표그룹지정필요)',
        value: 'yw.heo@bbodek.com',
      },
    ],
  },
  {
    displayValue: '작성자',
    value: 'created_by',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '강준영(플랫폼팀)',
        value: 'steve@bbodek.com',
      },
      {
        displayValue: '김지혜(플랫폼팀)',
        value: 'jeje@bbodek.com',
      },
      {
        displayValue: '임은서(퇴사)',
        value: 'sorhdit@bbodek.com',
      },
      {
        displayValue: '양승민(영업전략팀)',
        value: 'william@bbodek.com',
      },
      {
        displayValue: '김고은(퇴사)',
        value: 'gekl99@bbodek.com',
      },
      {
        displayValue: '박진주(플랫폼팀)',
        value: 'jj.park@bbodek.com',
      },
      {
        displayValue: '구본일(퇴사)',
        value: 'benjamin@bbodek.com',
      },
      {
        displayValue: '이준호(플랫폼팀)',
        value: 'juno@bbodek.com',
      },
      {
        displayValue: '김나현(퇴사)',
        value: 'officehyun123@bbodek.com',
      },
      {
        displayValue: '연영모(영업본부)',
        value: 'james@bbodek.com',
      },
      {
        displayValue: '정유주(퇴사)',
        value: 'yuju_jeong@bbodek.com',
      },
      {
        displayValue: '장문기(퇴사)',
        value: 'mgjang@bbodek.com',
      },
      {
        displayValue: '나재욱(영업팀)',
        value: 'jaeuk_na@bbodek.com',
      },
      {
        displayValue: '이준우(영업팀)',
        value: 'lee_junwoo@bbodek.com',
      },
      {
        displayValue: '이수환(퇴사)',
        value: 'hwan4998@bbodek.com',
      },
      {
        displayValue: '유준호(영업팀)',
        value: 'dbwnsghrk@bbodek.com',
      },
      {
        displayValue: '김정민(운영본부)',
        value: 'jm@bbodek.com',
      },
      {
        displayValue: '이애련(퇴사)',
        value: 'arlovlee724@bbodek.com',
      },
      {
        displayValue: '기보헌(서비스운영팀)',
        value: 'bohun.ki@bbodek.com',
      },
      {
        displayValue: '정승호(퇴사)',
        value: 'jshlotto@bbodek.com',
      },
      {
        displayValue: '이민우(퇴사)',
        value: 'dlalsdn432@bbodek.com',
      },
      {
        displayValue: '지영은(퇴사)',
        value: 'zoe.ji@bbodek.com',
      },
      {
        displayValue: '조성윤(서비스운영팀)',
        value: 'sungyuncho@bbodek.com',
      },
      {
        displayValue: '손요한(영업팀)',
        value: 'syh0208@bbodek.com',
      },
      {
        displayValue: '김신우(영업팀)',
        value: 'swkim@bbodek.com',
      },
      {
        displayValue: '신종현(영업팀)',
        value: 'qwas1472@bbodek.com',
      },
      {
        displayValue: '정희철(영업팀)',
        value: 'gmlcjf7846@bbodek.com',
      },
      {
        displayValue: '장성(화성팩토리팀)',
        value: 'suchang@bbodek.com',
      },
      {
        displayValue: '김주환(퇴사)',
        value: 'kjh96@bbodek.com',
      },
      {
        displayValue: '표성민(퇴사)',
        value: 'pyo@bbodek.com',
      },
      {
        displayValue: '심은화(서비스운영팀)',
        value: 'ehdgodjssl@bbodek.com',
      },
      {
        displayValue: '이유진(영업팀)',
        value: 'eugene@bbodek.com',
      },
      {
        displayValue: '오대준(퇴사)',
        value: 'deain95@bbodek.com',
      },
      {
        displayValue: '오지수(퇴사)',
        value: 'dhwltn@bbodek.com',
      },
      {
        displayValue: '전세은(퇴사)',
        value: 'seeun3456@bbodek.com',
      },
      {
        displayValue: '전승호(영업팀)',
        value: 'jce0502@bbodek.com',
      },
      {
        displayValue: '양준우(퇴사)',
        value: 'junu@bbodek.com',
      },
      {
        displayValue: '정휘영(퇴사)',
        value: 'hy.jung@bbodek.com',
      },
      {
        displayValue: '이민혁(영업팀)',
        value: 'illill9@bbodek.com',
      },
      {
        displayValue: '유형태(퇴사)',
        value: 'yooht@bbodek.com',
      },
      {
        displayValue: '장여원(CEOStaff)',
        value: 'yw.jang@bbodek.com',
      },
      {
        displayValue: '백정현(퇴사)',
        value: 'junghyun@bbodek.com',
      },
      {
        displayValue: '임대웅(화성팩토리팀)',
        value: 'unldw@bbodek.com',
      },
      {
        displayValue: '전다미(운영본부)',
        value: 'jeondami@bbodek.com',
      },
      {
        displayValue: '김지민(영업팀)',
        value: 'jimin_kim@bbodek.com',
      },
      {
        displayValue: '김진오(퇴사)',
        value: 'JINO@bbodek.com',
      },
      {
        displayValue: '심창우(퇴사)',
        value: 'felix@bbodek.com',
      },
      {
        displayValue: '전재억(채권팀)',
        value: 'jarukjeon@bbodek.com',
      },
      {
        displayValue: '이주영(서비스운영팀)',
        value: 'lee.juyoung@bbodek.com',
      },
      {
        displayValue: '심은정(퇴사)',
        value: 'dwtla16@bbodek.com',
      },
      {
        displayValue: '문기동(퇴사)',
        value: 'kdmoon@bbodek.com',
      },
      {
        displayValue: '박노준(Board)',
        value: 'pnjune@bbodek.com',
      },
      {
        displayValue: '홍성준(광명팩토리팀)',
        value: 'wangja133@bbodek.com',
      },
      {
        displayValue: '김용진(생산&물류총괄)',
        value: 'dydwls4882@bbodek.com',
      },
      {
        displayValue: '전종우(퇴사)',
        value: 'wjswhddnek@bbodek.com',
      },
      {
        displayValue: '박예찬(광명팩토리팀)',
        value: 'evan@bbodek.com',
      },
      {
        displayValue: '라힘찬(운송관리팀)',
        value: 'hcra@bbodek.com',
      },
      {
        displayValue: '이성우(광명팩토리팀)',
        value: 'bbodeklove@bbodek.com',
      },
      {
        displayValue: '정연홍(운송관리팀)',
        value: 'deoksong@bbodek.com',
      },
      {
        displayValue: '박가영(퇴사)',
        value: 'gayoung02@bbodek.com',
      },
      {
        displayValue: '태경재(Board)',
        value: 'taegoon@bbodek.com',
      },
      {
        displayValue: '이상훈(대표그룹지정필요)',
        value: 'lsh484@bbodek.com',
      },
      {
        displayValue: '김영효(퇴사)',
        value: 'younghyo@bbodek.com',
      },
      {
        displayValue: '박현민(운영본부)',
        value: 'hyunmin.park@bbodek.com',
      },
      {
        displayValue: '박경탁(물류관리팀)',
        value: 'gtpark@bbodek.com',
      },
      {
        displayValue: '김미림(퇴사)',
        value: 'mirimk@bbodek.com',
      },
      {
        displayValue: '임서현(퇴사)',
        value: 'imseohyunim@bbodek.com',
      },
      {
        displayValue: '김동빈(퇴사)',
        value: 'kdb1175@bbodek.com',
      },
      {
        displayValue: '임수정(재무회계팀)',
        value: '1214ejs@bbodek.com',
      },
      {
        displayValue: '이창현(퇴사)',
        value: 'lee2002sin@bbodek.com',
      },
      {
        displayValue: '채강석(화성팩토리팀)',
        value: 'corkdtjr@bbodek.com',
      },
      {
        displayValue: '김종목(물류관리팀)',
        value: 'jongmock0803@bbodek.com',
      },
      {
        displayValue: '문은주(퇴사)',
        value: 'ejmoon505@bbodek.com',
      },
      {
        displayValue: '조성민(퇴사)',
        value: 'sungmin8548@bbodek.com',
      },
      {
        displayValue: '이정민(퇴사)',
        value: 'jm05030@bbodek.com',
      },
      {
        displayValue: '김효빈(퇴사)',
        value: 'kimhb05@bbodek.com',
      },
      {
        displayValue: '김현정(퇴사)',
        value: 'guswjd4204@bbodek.com',
      },
      {
        displayValue: '송상화(운송관리팀)',
        value: 'huhussh@bbodek.com',
      },
      {
        displayValue: '민현주(운송관리팀)',
        value: 'mhj990319@bbodek.com',
      },
      {
        displayValue: '박서현(퇴사)',
        value: 'sdff123@bbodek.com',
      },
      {
        displayValue: '김동헌(퇴사)',
        value: 'Dhkim@bbodek.com',
      },
      {
        displayValue: '유미래(퇴사)',
        value: 'mr.yoo@bbodek.com',
      },
      {
        displayValue: '김정린(퇴사)',
        value: 'jr.kim@bbodek.com',
      },
      {
        displayValue: '김승훈(광명팩토리팀)',
        value: 'sh.kim@bbodek.com',
      },
      {
        displayValue: '이은서(재무회계팀)',
        value: 'es.lee@bbodek.com',
      },
      {
        displayValue: '김다해(퇴사)',
        value: 'dh.kim@bbodek.com',
      },
      {
        displayValue: '이상원(광명팩토리팀)',
        value: 'sw.lee@bbodek.com',
      },
      {
        displayValue: '이용혁(재무회계팀)',
        value: 'lyh@bbodek.com',
      },
      {
        displayValue: '이훈(스마트팩토리팀)',
        value: 'dlgns8z@bbodek.com',
      },
      {
        displayValue: '나승재(광명팩토리팀)',
        value: 'sh.ra@bbodek.com',
      },
      {
        displayValue: '진영호(퇴사)',
        value: 'yh.jin@bbodek.com',
      },
      {
        displayValue: '추유선(플랫폼팀)',
        value: 'ys.choo@bbodek.com',
      },
      {
        displayValue: '권유리(퇴사)',
        value: 'yr.kwon@bbodek.com',
      },
      {
        displayValue: '박정호(영업팀)',
        value: 'jh.park@bbodek.com',
      },
      {
        displayValue: '최현수(퇴사)',
        value: 'hs.choi@bbodek.com',
      },
      {
        displayValue: '장혜정(퇴사)',
        value: 'hj.jang@bbodek.com',
      },
      {
        displayValue: '김재성(운송관리팀)',
        value: 'kimjaesung@bbodek.com',
      },
      {
        displayValue: '표승민(영업전략팀)',
        value: 'sm.pyo@bbodek.com',
      },
      {
        displayValue: '정영은(대표그룹지정필요)',
        value: 'yejung@bbodek.com',
      },
      {
        displayValue: '신주용(플랫폼팀)',
        value: 'jy.shin@bbodek.com',
      },
      {
        displayValue: '김태형(퇴사)',
        value: 'th.kim@bbodek.com',
      },
      {
        displayValue: '최종섭(퇴사)',
        value: 'js.choi@bbodek.com',
      },
      {
        displayValue: '최연(퇴사)',
        value: 'y.choi@bbodek.com',
      },
      {
        displayValue: '박여진(서비스운영팀)',
        value: 'yj.park@bbodek.com',
      },
      {
        displayValue: '최성호(채권팀)',
        value: 'sh.choi@bbodek.com',
      },
      {
        displayValue: '이동석(스마트팩토리팀)',
        value: 'movingstone@bbodek.com',
      },
      {
        displayValue: '이지연(재무회계팀)',
        value: 'jy.lee@bbodek.com',
      },
      {
        displayValue: '송민재(서비스운영팀)',
        value: 'mj.song@bbodek.com',
      },
      {
        displayValue: '김나윤(서비스운영팀)',
        value: 'ny.kim@bbodek.com',
      },
      {
        displayValue: '이승호(영업팀)',
        value: 'sh.lee@bbodek.com',
      },
      {
        displayValue: '원주연(플랫폼팀)',
        value: 'jy.won@bbodek.com',
      },
      {
        displayValue: '문가을(대표그룹지정필요)',
        value: 'ge.mun@bbodek.com',
      },
      {
        displayValue: '전인표(대표그룹지정필요)',
        value: 'ip.jeon@bbodek.com',
      },
      {
        displayValue: '허역원(대표그룹지정필요)',
        value: 'yw.heo@bbodek.com',
      },
    ],
  },
  {
    displayValue: '상태',
    value: 'status',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '인입',
        value: 'RECEIVED',
      },
      {
        displayValue: '확인중',
        value: 'IN_PROGRESS',
      },
      {
        displayValue: '종결',
        value: 'CLOSED',
      },
      {
        displayValue: '삭제',
        value: 'DELETED',
      },
    ],
  },
  {
    displayValue: '업체',
    value: 'settlement_vendor',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '화성시선진식당',
        value: '7687',
      },
      {
        displayValue: '화성시한마음한식뷔페',
        value: '7686',
      },
      {
        displayValue: '역삼동인생맥주A',
        value: '7685',
      },
      {
        displayValue: '청량리동푸드윈서울홍릉초등학교',
        value: '7684',
      },
      {
        displayValue: '목내동행복식당',
        value: '7683',
      },
      {
        displayValue: '야당동숲푸드운정중학교',
        value: '7682',
      },
      {
        displayValue: '남촌동대일위탁급식소2',
        value: '7681',
      },
      {
        displayValue: '원시동엄마네밥상A',
        value: '7680',
      },
      {
        displayValue: '화성시(주)푸디스엘엔에프Tisa점',
        value: '7679',
      },
      {
        displayValue: '경주시복운식당',
        value: '7678',
      },
      {
        displayValue: '대치동(주)삼성웰스토리시대인재W관점(지하2층/소식당)',
        value: '7677',
      },
      {
        displayValue: '대치동(주)삼성웰스토리시대인재W관점(지하2층/대식당)',
        value: '7676',
      },
      {
        displayValue: '대치동(주)삼성웰스토리시대인재W관점(지하1층)',
        value: '7675',
      },
      {
        displayValue: '도화동조쉐프구내식당1',
        value: '7674',
      },
      {
        displayValue: '신길동미소식당',
        value: '7673',
      },
      {
        displayValue: '정왕동청정식당',
        value: '7672',
      },
      {
        displayValue: '개포동국립국악고등학교1',
        value: '7671',
      },
      {
        displayValue: '중동숲푸드경기예술고등학교',
        value: '7670',
      },
      {
        displayValue: '원시동맛있는식당',
        value: '7669',
      },
      {
        displayValue: '도내동성모푸드캐터링(이수건설)',
        value: '7668',
      },
      {
        displayValue: '화성시씨제이프레시웨이대웅바이오3공장점',
        value: '7667',
      },
      {
        displayValue: '돈암동(주)굿모닝실버푸드성북희망데이케어점',
        value: '7666',
      },
      {
        displayValue: '정왕동맛나뷔페',
        value: '7665',
      },
      {
        displayValue: '도화동베스트푸드케터링쿠팡인천45센터점',
        value: '7664',
      },
      {
        displayValue: '용인시백봉한식뷔페',
        value: '7663',
      },
      {
        displayValue: '정왕동자연밥상한식부페',
        value: '7656',
      },
      {
        displayValue: '화성시대경한식뷔페하나제약점',
        value: '7655',
      },
      {
        displayValue: '간석동웰빙한식뷔페',
        value: '7654',
      },
      {
        displayValue: '화성시더맛집한식뷔페',
        value: '7653',
      },
      {
        displayValue: '화성시산해진미한식부페',
        value: '7652',
      },
      {
        displayValue: '남촌동제이디푸드2',
        value: '7651',
      },
      {
        displayValue: '송도동인식당(단기)',
        value: '7650',
      },
      {
        displayValue: '항동채끝',
        value: '7649',
      },
      {
        displayValue: '이의동다인푸드',
        value: '7648',
      },
      {
        displayValue: '박달동(주)삼성웰스토리노루페인트안양본사점',
        value: '7647',
      },
      {
        displayValue: '도당동더차림한식뷔페',
        value: '7646',
      },
      {
        displayValue: '화성시칠칠한식뷔페',
        value: '7645',
      },
      {
        displayValue: '호계동수담푸드',
        value: '7644',
      },
      {
        displayValue: '안녕동온누리한식뷔페A',
        value: '7643',
      },
      {
        displayValue: '정왕동화담밥상',
        value: '7642',
      },
      {
        displayValue: '석관동유찬프랜즈맑은샘광천교회점',
        value: '7641',
      },
      {
        displayValue: '고잔동현일테크구내식당',
        value: '7640',
      },
      {
        displayValue: '배양동소울푸드2',
        value: '7639',
      },
      {
        displayValue: '평동착한밥상1',
        value: '7638',
      },
      {
        displayValue: '정왕동전주식당A',
        value: '7637',
      },
      {
        displayValue: '울산시고향식당',
        value: '7636',
      },
      {
        displayValue: '정자동그린에프에스명은간호전문요양원',
        value: '7635',
      },
      {
        displayValue: '세류동씨제이프레시웨이버드내노인복지관점',
        value: '7634',
      },
      {
        displayValue: '정왕동피앤비식당',
        value: '7633',
      },
      {
        displayValue: '오류동한서한식뷔페',
        value: '7632',
      },
      {
        displayValue: '남대문로4가코트야드메리어트구내식당',
        value: '7631',
      },
      {
        displayValue: '제기동(주)굿모닝실버푸드웰나우통합요양센터점(4층)',
        value: '7625',
      },
      {
        displayValue: '제기동(주)굿모닝실버푸드웰나우통합요양센터점(3층)',
        value: '7624',
      },
      {
        displayValue: '제기동(주)굿모닝실버푸드웰나우통합요양센터점(2층)',
        value: '7623',
      },
      {
        displayValue: '화성시찐이네밥상',
        value: '7622',
      },
      {
        displayValue: '화성시설레는밥상1',
        value: '7621',
      },
      {
        displayValue: '화성시온천한식뷔페',
        value: '7620',
      },
      {
        displayValue: '의왕시푸드인외식함바현장점',
        value: '7619',
      },
      {
        displayValue: '천안시봉구네한식뷔페',
        value: '7618',
      },
      {
        displayValue: '성곡동포도나무식당',
        value: '7617',
      },
      {
        displayValue: '울산시동남푸드',
        value: '7616',
      },
      {
        displayValue: '청천동조이푸드',
        value: '7615',
      },
      {
        displayValue: '화성시다드림한식뷔페석포리점',
        value: '7614',
      },
      {
        displayValue: '화성시정남면엄마손한식부페',
        value: '7613',
      },
      {
        displayValue: '화성시뉴그린한식뷔페B',
        value: '7612',
      },
      {
        displayValue: '화성시(주)다원푸드',
        value: '7611',
      },
      {
        displayValue: '자양동마더앤찬신양초등학교점2',
        value: '7610',
      },
      {
        displayValue: '답십리동소담찬',
        value: '7609',
      },
      {
        displayValue: '청라동용현푸드',
        value: '7608',
      },
      {
        displayValue: '대치동(주)삼성웰스토리시대인재신관점',
        value: '7607',
      },
      {
        displayValue: '목동(주)삼성웰스토리시대인재목동관점(8층/석식)',
        value: '7606',
      },
      {
        displayValue: '목동(주)삼성웰스토리시대인재목동관점(8층/중식)',
        value: '7605',
      },
      {
        displayValue: '목동(주)삼성웰스토리시대인재목동관점(7층/석식)',
        value: '7604',
      },
      {
        displayValue: '목동(주)삼성웰스토리시대인재목동관점(7층/중식)',
        value: '7603',
      },
      {
        displayValue: '신정동진심밥상',
        value: '7602',
      },
      {
        displayValue: '지축동정성애담은',
        value: '7601',
      },
      {
        displayValue: '김포시대가',
        value: '7600',
      },
      {
        displayValue: '고잔동급식연구소인천인력개발원점',
        value: '7591',
      },
      {
        displayValue: '계동현대그린푸드현대건설본사점',
        value: '7590',
      },
      {
        displayValue: '석남동맛나한식부페B',
        value: '7589',
      },
      {
        displayValue: '덕풍동리쉐프도시락A',
        value: '7588',
      },
      {
        displayValue: '화성시씨제이프레시웨이대웅제약향남공장점',
        value: '7587',
      },
      {
        displayValue: '가산동뽕가네한식부페',
        value: '7586',
      },
      {
        displayValue: '화성시다온한식부페A',
        value: '7585',
      },
      {
        displayValue: '화성시네츄럴푸드현대실버요양원점',
        value: '7584',
      },
      {
        displayValue: '화성시명성에프엠씨아스플로점',
        value: '7583',
      },
      {
        displayValue: '항동초심한식뷔페',
        value: '7582',
      },
      {
        displayValue: '오류동건강한웰빙한식뷔페',
        value: '7581',
      },
      {
        displayValue: '용인시좋은나무한식뷔페2',
        value: '7580',
      },
      {
        displayValue: '역동강지우밥상',
        value: '7579',
      },
      {
        displayValue: '화성시우정읍진수성찬한식부페',
        value: '7578',
      },
      {
        displayValue: '서운동착한밥집6호점',
        value: '7571',
      },
      {
        displayValue: '정왕동이지푸드',
        value: '7570',
      },
      {
        displayValue: '상대원동더드림푸드',
        value: '7569',
      },
      {
        displayValue: '정왕동대림식당',
        value: '7568',
      },
      {
        displayValue: '백현동씨제이프레시웨이크래프톤판교점',
        value: '7567',
      },
      {
        displayValue: '김포시케이에스엠',
        value: '7566',
      },
      {
        displayValue: '구월동장금이한식뷔페A',
        value: '7565',
      },
      {
        displayValue: '정왕동맛고을시화공단',
        value: '7564',
      },
      {
        displayValue: '화성시수라연한식뷔페',
        value: '7563',
      },
      {
        displayValue: '원흥동(주)더바른푸드2',
        value: '7562',
      },
      {
        displayValue: '오금동유니버셜푸드사랑의교회점(단기)',
        value: '7561',
      },
      {
        displayValue: '정왕동정성식당정왕점',
        value: '7560',
      },
      {
        displayValue: '정왕동정성가득본점',
        value: '7559',
      },
      {
        displayValue: '정왕동정성식당',
        value: '7558',
      },
      {
        displayValue: '화성시우정한식뷔페',
        value: '7557',
      },
      {
        displayValue: '상동(주)파인쿡부천청솔학원점1',
        value: '7556',
      },
      {
        displayValue: '화성시천일',
        value: '7555',
      },
      {
        displayValue: '화성시정성을담은한식뷔페월드팩점',
        value: '7554',
      },
      {
        displayValue: '화성시정성을담은한식뷔페A',
        value: '7553',
      },
      {
        displayValue: '이천시남도한뷔페주식회사엘에스케이지점',
        value: '7552',
      },
      {
        displayValue: '화성시이모네맛집한식뷔페',
        value: '7551',
      },
      {
        displayValue: '화성시진미푸드1',
        value: '7550',
      },
      {
        displayValue: '논현동디에스산업위탁급식소',
        value: '7549',
      },
      {
        displayValue: '시흥동엄니도시락한식뷔페판교점',
        value: '7548',
      },
      {
        displayValue: '두왕동테크노출장뷔페(단기)',
        value: '7547',
      },
      {
        displayValue: '녹양동행복한부페',
        value: '7546',
      },
      {
        displayValue: '가산동딜라이트푸드',
        value: '7545',
      },
      {
        displayValue: '당정동돌샘한식뷔페',
        value: '7544',
      },
      {
        displayValue: '화성시정남면남도한식뷔페',
        value: '7522',
      },
      {
        displayValue: '계수동부자한식부페',
        value: '7521',
      },
      {
        displayValue: '김포시황금식당',
        value: '7520',
      },
      {
        displayValue: '관양동중앙공원한식뷔페',
        value: '7519',
      },
      {
        displayValue: '화성시다드림한식뷔페1',
        value: '7518',
      },
      {
        displayValue: '구로동건강한밥상',
        value: '7517',
      },
      {
        displayValue: '원시동하이테크구내식당A',
        value: '7516',
      },
      {
        displayValue: '화성시마도면엄마손한식뷔페',
        value: '7515',
      },
      {
        displayValue: '관양동남가네추어탕평촌남부점',
        value: '7514',
      },
      {
        displayValue: '여의도동씨제이프레시웨이아톤쿼터백점',
        value: '7513',
      },
      {
        displayValue: '평택시은성한식뷔페1',
        value: '7512',
      },
      {
        displayValue: '지곶동일품한식부페',
        value: '7511',
      },
      {
        displayValue: '가장동비전푸드한식뷔페',
        value: '7510',
      },
      {
        displayValue: '신흥동해정식당A',
        value: '7509',
      },
      {
        displayValue: '광주시사랑방',
        value: '7508',
      },
      {
        displayValue: '원곡동서울한식뷔페',
        value: '7507',
      },
      {
        displayValue: '정왕동한가족식당A',
        value: '7506',
      },
      {
        displayValue: '노온사동위드인',
        value: '7505',
      },
      {
        displayValue: '구운동명성에프엠씨',
        value: '7504',
      },
      {
        displayValue: '갈현동주식회사중앙푸드A',
        value: '7503',
      },
      {
        displayValue: '신방동모아모아셀프밥상',
        value: '7488',
      },
      {
        displayValue: '김포시청춘밥상',
        value: '7487',
      },
      {
        displayValue: '십정동쭌이네한식뷔페',
        value: '7486',
      },
      {
        displayValue: '죽전동강지우밥상',
        value: '7485',
      },
      {
        displayValue: '화성시고을한식뷔페B',
        value: '7484',
      },
      {
        displayValue: '박달동노루페인트안양본사',
        value: '7483',
      },
      {
        displayValue: '김포시푸드윈서울이마트물류센터점',
        value: '7482',
      },
      {
        displayValue: '지곶동씨제이프레시웨이이에스티점',
        value: '7481',
      },
      {
        displayValue: '화성시맛고을한식부페1',
        value: '7480',
      },
      {
        displayValue: '원창동베스트푸드케터링쿠팡인천TW센터점',
        value: '7479',
      },
      {
        displayValue: '고암동다정한푸드',
        value: '7478',
      },
      {
        displayValue: '정왕동보미식당',
        value: '7477',
      },
      {
        displayValue: '정왕동상신식당매점',
        value: '7476',
      },
      {
        displayValue: '화성시설레는밥상',
        value: '7475',
      },
      {
        displayValue: '초지동미락식당행복점',
        value: '7474',
      },
      {
        displayValue: '내삼미동(주)모닝푸드참사랑요양원점',
        value: '7473',
      },
      {
        displayValue: '화성시아전구내식당(대성식당)',
        value: '7472',
      },
      {
        displayValue: '화성시남도구내식당',
        value: '7468',
      },
      {
        displayValue: '경주시미가한식뷔페',
        value: '7467',
      },
      {
        displayValue: '고잔동삼영테크위탁급식소',
        value: '7466',
      },
      {
        displayValue: '화성시노여사집밥',
        value: '7465',
      },
      {
        displayValue: '오목천동주식회사웰푸드웃음꽃요양원',
        value: '7464',
      },
      {
        displayValue: '김포시소풍',
        value: '7463',
      },
      {
        displayValue: '합정동현대다우리한식뷔페3호점',
        value: '7462',
      },
      {
        displayValue: '울산시온누리푸드시스템',
        value: '7461',
      },
      {
        displayValue: '화성시금메달한식뷔페',
        value: '7460',
      },
      {
        displayValue: '고색동웰빙푸드',
        value: '7459',
      },
      {
        displayValue: '정왕동진수성찬',
        value: '7458',
      },
      {
        displayValue: '화성시더밥상',
        value: '7457',
      },
      {
        displayValue: '방배동급식연구소엠브레인점',
        value: '7456',
      },
      {
        displayValue: '화성시더드림뷔페(단기)',
        value: '7455',
      },
      {
        displayValue: '누읍동청명식당코우점',
        value: '7454',
      },
      {
        displayValue: '화성시제이엘푸드고려택배점',
        value: '7449',
      },
      {
        displayValue: '누읍동청명식당',
        value: '7448',
      },
      {
        displayValue: '고잔동진영열처리위탁급식소A',
        value: '7447',
      },
      {
        displayValue: '용인시대경한식뷔페삼화콘덴서점',
        value: '7446',
      },
      {
        displayValue: '당정동센트럴푸드1',
        value: '7445',
      },
      {
        displayValue: '모곡동씨제이프레시웨이엘티씨에이엠점',
        value: '7444',
      },
      {
        displayValue: '김포시도담시리한식부페',
        value: '7443',
      },
      {
        displayValue: '장항동사색찬미한식부페',
        value: '7442',
      },
      {
        displayValue: '정왕동수지한식부페',
        value: '7441',
      },
      {
        displayValue: '화성시민속향한식뷔페',
        value: '7440',
      },
      {
        displayValue: '화성시장모님밥상A',
        value: '7439',
      },
      {
        displayValue: '화성시호남한식부페석천리점',
        value: '7438',
      },
      {
        displayValue: '방배동깐부치킨사당역점A',
        value: '7437',
      },
      {
        displayValue: '경주시석계공단식당',
        value: '7436',
      },
      {
        displayValue: '관양동청솔푸드1',
        value: '7431',
      },
      {
        displayValue: '울산시(주)점심시간',
        value: '7430',
      },
      {
        displayValue: '평택시하나푸드1',
        value: '7429',
      },
      {
        displayValue: '호계동하루한끼',
        value: '7428',
      },
      {
        displayValue: '화성시서신면맛있는밥집A',
        value: '7427',
      },
      {
        displayValue: '용인시씨제이프레시웨이씨앤씨인터내셔널그린카운티점',
        value: '7426',
      },
      {
        displayValue: '목내동전주식당한식뷔페',
        value: '7425',
      },
      {
        displayValue: '화성시행복한밥상한식뷔페',
        value: '7424',
      },
      {
        displayValue: '화성시도현한식뷔페',
        value: '7423',
      },
      {
        displayValue: '일직동파티수광명점A',
        value: '7422',
      },
      {
        displayValue: '평택시만나한식뷔페고덕점',
        value: '7421',
      },
      {
        displayValue: '원시동우리집밥상',
        value: '7420',
      },
      {
        displayValue: '성곡동베스트식당',
        value: '7416',
      },
      {
        displayValue: '향동동밥앤쿡',
        value: '7415',
      },
      {
        displayValue: '포일동청담한식뷔페1',
        value: '7414',
      },
      {
        displayValue: '정왕동진수성찬대성정밀기계점',
        value: '7413',
      },
      {
        displayValue: '평택시장모님밥상',
        value: '7412',
      },
      {
        displayValue: '운서동행복식당공사현장지점',
        value: '7411',
      },
      {
        displayValue: '성곡동베스트푸드케터링쿠팡안산2센터점A1',
        value: '7410',
      },
      {
        displayValue: '성곡동베스트푸드케터링맨파워점1',
        value: '7409',
      },
      {
        displayValue: '원시동전주한정식부페',
        value: '7408',
      },
      {
        displayValue: '초지동미락식당A',
        value: '7407',
      },
      {
        displayValue: '도당동행복한밥상',
        value: '7406',
      },
      {
        displayValue: '정왕동전주식당에드마점',
        value: '7405',
      },
      {
        displayValue: '연희동주식회사드림잇',
        value: '7404',
      },
      {
        displayValue: '배곧동골드한식뷔페',
        value: '7403',
      },
      {
        displayValue: '성곡동전주한식뷔페',
        value: '7402',
      },
      {
        displayValue: '장항동큰손한식뷔페',
        value: '7401',
      },
      {
        displayValue: '정왕동보성식당A',
        value: '7400',
      },
      {
        displayValue: '배곧동엄마의밥상',
        value: '7399',
      },
      {
        displayValue: '정왕동청년한식뷔페',
        value: '7398',
      },
      {
        displayValue: '구래동모세한식뷔페',
        value: '7397',
      },
      {
        displayValue: '배곧동미나봉테이블1',
        value: '7396',
      },
      {
        displayValue: '초지동도깨비식당',
        value: '7395',
      },
      {
        displayValue: '용인시(주)공기밥에이블로지스물류센터점',
        value: '7394',
      },
      {
        displayValue: '화성시최해진의12첩밥상',
        value: '7393',
      },
      {
        displayValue: '화성시다온한식뷔페팔탄점A',
        value: '7392',
      },
      {
        displayValue: '경주시은일식당',
        value: '7391',
      },
      {
        displayValue: '금정동슬기로운밥상1',
        value: '7390',
      },
      {
        displayValue: '가산동그린잇',
        value: '7389',
      },
      {
        displayValue: '화성시명화한식뷔페',
        value: '7388',
      },
      {
        displayValue: '사리현동사색찬미한식뷔페일산순복음영산교회점',
        value: '7386',
      },
      {
        displayValue: '울산시지상캐터링서비스',
        value: '7385',
      },
      {
        displayValue: '효성동코끼리한식뷔페',
        value: '7384',
      },
      {
        displayValue: '송림동초심한식뷔페',
        value: '7352',
      },
      {
        displayValue: '화성시명품한식뷔페',
        value: '7351',
      },
      {
        displayValue: '장안동(주)굿모닝실버푸드참사랑실버재활주간보호센터점',
        value: '7350',
      },
      {
        displayValue: '화성시네츄럴푸드팔탄숲속요양원점',
        value: '7349',
      },
      {
        displayValue: '사우동진앤푸드효원연수원점',
        value: '7348',
      },
      {
        displayValue: '도곡동은광여자고등학교',
        value: '7347',
      },
      {
        displayValue: '원미동장터골식당',
        value: '7346',
      },
      {
        displayValue: '성곡동웰빙푸드',
        value: '7345',
      },
      {
        displayValue: '화성시석포리맛집한식뷔페',
        value: '7344',
      },
      {
        displayValue: '영천동웰스푸드',
        value: '7343',
      },
      {
        displayValue: '미아동신일고등학교(중식)',
        value: '7342',
      },
      {
        displayValue: '화성시고고푸드동원요양원점',
        value: '7341',
      },
      {
        displayValue: '반포동세화여자중학교',
        value: '7340',
      },
      {
        displayValue: '아산시자매한정식뷔페',
        value: '7339',
      },
      {
        displayValue: '송동주주푸드쌍용건설현장점',
        value: '7338',
      },
      {
        displayValue: '잠실동정신여자고등학교',
        value: '7337',
      },
      {
        displayValue: '화성시한담한식뷔페',
        value: '7336',
      },
      {
        displayValue: '아산시전주식당',
        value: '7335',
      },
      {
        displayValue: '청주시소풍',
        value: '7334',
      },
      {
        displayValue: '목동옥토골한식뷔페1',
        value: '7333',
      },
      {
        displayValue: '이태원동국군재정관리단',
        value: '7332',
      },
      {
        displayValue: '세류동(주)푸드디자인디에스오토점',
        value: '7331',
      },
      {
        displayValue: '가좌동드림한식뷔페',
        value: '7330',
      },
      {
        displayValue: '가산동해피타임1',
        value: '7329',
      },
      {
        displayValue: '정왕동베스트푸드케터링시흥1센터2층식당',
        value: '7328',
      },
      {
        displayValue: '경주시미앤미푸드제이와이오토텍점',
        value: '7327',
      },
      {
        displayValue: '매곡동미앤미푸드성웅인더스트리점',
        value: '7326',
      },
      {
        displayValue: '매곡동미앤미푸드영신테크점',
        value: '7325',
      },
      {
        displayValue: '매곡동미앤미푸드',
        value: '7324',
      },
      {
        displayValue: '중산동대명테크구내식당',
        value: '7323',
      },
      {
        displayValue: '정왕동베스트푸드케터링시흥1센터1층식당',
        value: '7322',
      },
      {
        displayValue: '파주시한마음한식뷔페',
        value: '7321',
      },
      {
        displayValue: '경주시은일한식뷔페',
        value: '7301',
      },
      {
        displayValue: '화성시미가한식뷔페',
        value: '7300',
      },
      {
        displayValue: '화성시우리집한식뷔페',
        value: '7299',
      },
      {
        displayValue: '내동숲푸드',
        value: '7298',
      },
      {
        displayValue: '평택시원푸드코리아',
        value: '7297',
      },
      {
        displayValue: '화성시다담한식뷔페',
        value: '7296',
      },
      {
        displayValue: '울산시들꽃한식뷔페',
        value: '7295',
      },
      {
        displayValue: '성곡동푸짐한밥집',
        value: '7294',
      },
      {
        displayValue: '정왕동동산한식뷔페',
        value: '7293',
      },
      {
        displayValue: '삼평동이에이치푸드판교점',
        value: '7292',
      },
      {
        displayValue: '금곡동제이엠푸드',
        value: '7291',
      },
      {
        displayValue: '고잔동다감식당',
        value: '7290',
      },
      {
        displayValue: '경주시제내식당',
        value: '7289',
      },
      {
        displayValue: '역삼동인생맥주',
        value: '7288',
      },
      {
        displayValue: '남촌동대주식당',
        value: '7287',
      },
      {
        displayValue: '정왕동로뎀나무한식뷔페',
        value: '7286',
      },
      {
        displayValue: '상계동롯데백화점노원점',
        value: '7285',
      },
      {
        displayValue: '역삼동고려무쌍신식요리제법',
        value: '7284',
      },
      {
        displayValue: '화성시압구정한식부페1',
        value: '7283',
      },
      {
        displayValue: '성곡동현대한식뷔페',
        value: '7276',
      },
      {
        displayValue: '목내동시골밥상',
        value: '7275',
      },
      {
        displayValue: '석남동한식대첩푸드',
        value: '7274',
      },
      {
        displayValue: '개포동개현초등학교2',
        value: '7273',
      },
      {
        displayValue: '화성시소담1',
        value: '7272',
      },
      {
        displayValue: '성곡동본가한식뷔페',
        value: '7271',
      },
      {
        displayValue: '운서동행복식당공사현장',
        value: '7270',
      },
      {
        displayValue: '안양동엄마손한식뷔페',
        value: '7269',
      },
      {
        displayValue: '일직동엄니도시락한식뷔페',
        value: '7268',
      },
      {
        displayValue: '이천시씨제이프레시웨이쿠팡이천2센터점1',
        value: '7267',
      },
      {
        displayValue: '청천동새빛식당A',
        value: '7266',
      },
      {
        displayValue: '고잔동그린푸드위탁급식소1',
        value: '7265',
      },
      {
        displayValue: '관양동더밥집',
        value: '7264',
      },
      {
        displayValue: '판교동제이엘푸드판교우리들교회점',
        value: '7263',
      },
      {
        displayValue: '송도동봄봄송도점',
        value: '7262',
      },
      {
        displayValue: '송도동씨제이프레시웨이유일로보틱스점',
        value: '7261',
      },
      {
        displayValue: '청담동마고꼬로',
        value: '7260',
      },
      {
        displayValue: '태전동백록',
        value: '7259',
      },
      {
        displayValue: '태전동백록사계절1',
        value: '7258',
      },
      {
        displayValue: '화성시엄마손한식부페선일솔루션지점A',
        value: '7257',
      },
      {
        displayValue: '화성시엄마손한식뷔페A',
        value: '7256',
      },
      {
        displayValue: '성곡동와이푸드A',
        value: '7255',
      },
      {
        displayValue: '역삼동씨제이프레시웨이클로버추얼패션점1',
        value: '7254',
      },
      {
        displayValue: '화성시만나한식부페',
        value: '7253',
      },
      {
        displayValue: '서계동배문고등학교1',
        value: '7252',
      },
      {
        displayValue: '사노동푸드포레1',
        value: '7251',
      },
      {
        displayValue: '개포동개원초등학교2',
        value: '7233',
      },
      {
        displayValue: '화성시대가한식부페',
        value: '7232',
      },
      {
        displayValue: '원시동로뎀한식부페',
        value: '7231',
      },
      {
        displayValue: '역삼동역삼중학교1',
        value: '7230',
      },
      {
        displayValue: '오목천동웃음꽃요양원',
        value: '7229',
      },
      {
        displayValue: '화성시다드림한식뷔페당하리점',
        value: '7228',
      },
      {
        displayValue: '화성시팔탄한식뷔페',
        value: '7227',
      },
      {
        displayValue: '가경동옥이네한식',
        value: '7226',
      },
      {
        displayValue: '안성시오병이어한식뷔페',
        value: '7225',
      },
      {
        displayValue: '개신동푸드다미안',
        value: '7224',
      },
      {
        displayValue: '가장동백쉐프의한식뷔페',
        value: '7223',
      },
      {
        displayValue: '목내동한국소나무집',
        value: '7222',
      },
      {
        displayValue: '성성동미소한식뷔페공사장지점',
        value: '7221',
      },
      {
        displayValue: '오류동두코구내식당',
        value: '7220',
      },
      {
        displayValue: '화성시이정희의12첩반상',
        value: '7219',
      },
      {
        displayValue: '북아현동푸드윈서울북성초등학교점',
        value: '7218',
      },
      {
        displayValue: '화성시네츄럴푸드가재울재활요양원점1',
        value: '7217',
      },
      {
        displayValue: '흑석동은로초등학교',
        value: '7200',
      },
      {
        displayValue: '당정동한식뷔페이든',
        value: '7199',
      },
      {
        displayValue: '역삼동씨제이프레시웨이클로버추얼패션점',
        value: '7198',
      },
      {
        displayValue: '상현동상록한식뷔페',
        value: '7197',
      },
      {
        displayValue: '갈현동쿠킹트리한식뷔페A',
        value: '7196',
      },
      {
        displayValue: '화성시라몽이네',
        value: '7195',
      },
      {
        displayValue: '당정동행복한밥상',
        value: '7194',
      },
      {
        displayValue: '동천동동천한식뷔페A',
        value: '7193',
      },
      {
        displayValue: '화성시단호박한식뷔페',
        value: '7192',
      },
      {
        displayValue: '불당동만나한식뷔페',
        value: '7191',
      },
      {
        displayValue: '회기동경희여자고등학교',
        value: '7190',
      },
      {
        displayValue: '진관동하나고등학교',
        value: '7189',
      },
      {
        displayValue: '청주시행복한밥상',
        value: '7188',
      },
      {
        displayValue: '덕은동다섬한식뷔페',
        value: '7187',
      },
      {
        displayValue: '대치동단국대학교사범대학부속고등학교1',
        value: '7186',
      },
      {
        displayValue: '장항동은혜식당',
        value: '7185',
      },
      {
        displayValue: '신동더만족한식당',
        value: '7180',
      },
      {
        displayValue: '성성동미소한식뷔페',
        value: '7179',
      },
      {
        displayValue: '새솔동니즈푸드새솔초등학교점',
        value: '7178',
      },
      {
        displayValue: '화성시남양읍행복한밥상북양리점',
        value: '7177',
      },
      {
        displayValue: '화성시네츄럴푸드노블힐요양원점',
        value: '7176',
      },
      {
        displayValue: '방이동우아한2어린이집(비즈)',
        value: '7175',
      },
      {
        displayValue: '방이동우아한어린이집(비즈)',
        value: '7174',
      },
      {
        displayValue: '서초동디토',
        value: '7173',
      },
      {
        displayValue: '삼평동런치스토리',
        value: '7172',
      },
      {
        displayValue: '정왕동한가족식당',
        value: '7171',
      },
      {
        displayValue: '외북동토마토한식뷔페',
        value: '7170',
      },
      {
        displayValue: '화성시팔탄면진수성찬A',
        value: '7169',
      },
      {
        displayValue: '송동파티수동탄호수점',
        value: '7168',
      },
      {
        displayValue: '원흥동파티수고양원흥역점',
        value: '7167',
      },
      {
        displayValue: '상대원동늘봄밥상중앙',
        value: '7156',
      },
      {
        displayValue: '주엽동(주)파인쿡일산청솔학원점',
        value: '7155',
      },
      {
        displayValue: '원창동쭌이네한식뷔페1',
        value: '7154',
      },
      {
        displayValue: '평택시해마루한식뷔페',
        value: '7153',
      },
      {
        displayValue: '정왕동부원식당A',
        value: '7152',
      },
      {
        displayValue: '청주시자연밥상',
        value: '7151',
      },
      {
        displayValue: '매탄동네츄럴푸드봄날요양원점',
        value: '7150',
      },
      {
        displayValue: '아산시케이푸드둔포면점',
        value: '7149',
      },
      {
        displayValue: '원당동성문한식뷔페',
        value: '7148',
      },
      {
        displayValue: '청주시밥이랑찬이랑',
        value: '7147',
      },
      {
        displayValue: '역삼동도성초등학교',
        value: '7146',
      },
      {
        displayValue: '화성시푸짐한밥상장안면점',
        value: '7145',
      },
      {
        displayValue: '일원동대모초등학교1',
        value: '7144',
      },
      {
        displayValue: '오류동쿠킹스토리1',
        value: '7143',
      },
      {
        displayValue: '당정동예향한식부페4',
        value: '7142',
      },
      {
        displayValue: '화성시맛있는밥상뷔페1',
        value: '7141',
      },
      {
        displayValue: '잠원동잠원초등학교',
        value: '7140',
      },
      {
        displayValue: '서초동원명초등학교',
        value: '7139',
      },
      {
        displayValue: '화전동국희네식당1',
        value: '7138',
      },
      {
        displayValue: '구래동양촌식당',
        value: '7137',
      },
      {
        displayValue: '반포본동세화고등학교',
        value: '7136',
      },
      {
        displayValue: '평택시현덕식당1',
        value: '7135',
      },
      {
        displayValue: '화성시수라상한식부페',
        value: '7134',
      },
      {
        displayValue: '용인시만나웰빙한식뷔페2호점',
        value: '7133',
      },
      {
        displayValue: '정왕동자연밥집1',
        value: '7132',
      },
      {
        displayValue: '곡반정동(주)화랑푸드좋은인연요양센터점',
        value: '7131',
      },
      {
        displayValue: '자곡동율현초등학교1',
        value: '7130',
      },
      {
        displayValue: '남북동전라도한식뷔페A',
        value: '7129',
      },
      {
        displayValue: '권선동데일리푸드경기도일자리재단점',
        value: '7100',
      },
      {
        displayValue: '화성시맛사랑한식뷔페',
        value: '7099',
      },
      {
        displayValue: '도곡동언주초등학교1',
        value: '7098',
      },
      {
        displayValue: '고잔동임실구내식당',
        value: '7097',
      },
      {
        displayValue: '화성시정문식당',
        value: '7096',
      },
      {
        displayValue: '오전동미르한식뷔페2',
        value: '7095',
      },
      {
        displayValue: '서초동지씨에스서초타워점',
        value: '7094',
      },
      {
        displayValue: '김포시행복한밥상B',
        value: '7093',
      },
      {
        displayValue: '석남동맛나한식부페A',
        value: '7092',
      },
      {
        displayValue: '광석동좋은한식뷔페',
        value: '7091',
      },
      {
        displayValue: '광주시맛드림한정식2',
        value: '7090',
      },
      {
        displayValue: '화성시이모네한식',
        value: '7089',
      },
      {
        displayValue: '가좌동착한식당한식뷔페',
        value: '7088',
      },
      {
        displayValue: '평택시동문한식뷔페2호점',
        value: '7087',
      },
      {
        displayValue: '장항동통큰밥상1',
        value: '7086',
      },
      {
        displayValue: '안성시주주푸드한겨레고등학교점',
        value: '7085',
      },
      {
        displayValue: '성수동우리집밥',
        value: '7084',
      },
      {
        displayValue: '당정동박셰프1',
        value: '7083',
      },
      {
        displayValue: '가장동베스트푸드케터링1B',
        value: '7072',
      },
      {
        displayValue: '용인시베스트푸드케터링몬즈컴퍼니점B',
        value: '7071',
      },
      {
        displayValue: '이천시베스트푸드케터링쿠팡이천4센터B',
        value: '7070',
      },
      {
        displayValue: '평택시베스트푸드케터링쿠팡평택5센터B',
        value: '7069',
      },
      {
        displayValue: '천안시베스트푸드케터링쿠팡천안6센터B',
        value: '7068',
      },
      {
        displayValue: '화성시만찬한정식뷔페',
        value: '7067',
      },
      {
        displayValue: '화성시향남읍수라상한식뷔페',
        value: '7066',
      },
      {
        displayValue: '성곡동미소식당A',
        value: '7065',
      },
      {
        displayValue: '상동(주)파인쿡부천청솔학원점',
        value: '7064',
      },
      {
        displayValue: '왕길동(주)리온누리컴퍼니미래복지요양센터점',
        value: '7063',
      },
      {
        displayValue: '안성시큰나무한식뷔페',
        value: '7062',
      },
      {
        displayValue: '화성시찬미네한식뷔페',
        value: '7061',
      },
      {
        displayValue: '화성시정성푸드한식뷔페',
        value: '7060',
      },
      {
        displayValue: '북변동한끼맘',
        value: '7059',
      },
      {
        displayValue: '삼정동소담골A',
        value: '7058',
      },
      {
        displayValue: '청천동한울푸드',
        value: '7057',
      },
      {
        displayValue: '화성시우정한식부페향남점',
        value: '7056',
      },
      {
        displayValue: '화성시조암한식뷔페',
        value: '7055',
      },
      {
        displayValue: '화성시전주한식뷔페A',
        value: '7054',
      },
      {
        displayValue: '서초동나이스캐터링재향군인회점',
        value: '7053',
      },
      {
        displayValue: '청천동한샘셀프식당2',
        value: '7052',
      },
      {
        displayValue: '상대원동가원A',
        value: '7044',
      },
      {
        displayValue: '여주시원조잔치케이투코리아물류센터2센터점',
        value: '7041',
      },
      {
        displayValue: '여주시원조잔치케이투코리아물류센터1센터점',
        value: '7040',
      },
      {
        displayValue: '상일동VIP푸드한영고등학교',
        value: '7039',
      },
      {
        displayValue: '감일동란도시락신우초등학교지점',
        value: '7038',
      },
      {
        displayValue: '구갈동더존푸드',
        value: '7037',
      },
      {
        displayValue: '화성시찬이네한식뷔페',
        value: '7033',
      },
      {
        displayValue: '화성시안목골한식뷔페',
        value: '7032',
      },
      {
        displayValue: '고잔동대안스틸주식회사위탁급식소A',
        value: '7031',
      },
      {
        displayValue: '화성시화진한식뷔페',
        value: '7030',
      },
      {
        displayValue: '화성시꽃돼지한식뷔페',
        value: '7014',
      },
      {
        displayValue: '동산동신의한수',
        value: '7013',
      },
      {
        displayValue: '화성시금풍식당1',
        value: '7012',
      },
      {
        displayValue: '오목천동그린웰푸드샤론의꽃요양원',
        value: '7011',
      },
      {
        displayValue: '대치동휘문중학교1',
        value: '7010',
      },
      {
        displayValue: '농서동농서한식뷔페1',
        value: '7009',
      },
      {
        displayValue: '화성시입안에행복',
        value: '7008',
      },
      {
        displayValue: '방배동서문여자고등학교1',
        value: '7007',
      },
      {
        displayValue: '평택시만나웰빙한식뷔페물류센터점',
        value: '7006',
      },
      {
        displayValue: '안성시베스트푸드케터링쿠팡안성8센터점',
        value: '7005',
      },
      {
        displayValue: '석남동명가식당A',
        value: '7004',
      },
      {
        displayValue: '가산동우리솔잎푸드1',
        value: '7003',
      },
      {
        displayValue: '화성시전라도한식부페귀래점',
        value: '7002',
      },
      {
        displayValue: '화성시전라도한식부페A',
        value: '7001',
      },
      {
        displayValue: '파주시행복한한식부페1',
        value: '7000',
      },
      {
        displayValue: '구미동예촌한식뷔페',
        value: '6999',
      },
      {
        displayValue: '화성시해양마루한식부페',
        value: '6980',
      },
      {
        displayValue: '화성시밥향기한식뷔페A',
        value: '6979',
      },
      {
        displayValue: '안성시급식연구소1',
        value: '6978',
      },
      {
        displayValue: '풍산동따뜻한한끼한식뷔페',
        value: '6977',
      },
      {
        displayValue: '사당동사계절푸드앤도시락',
        value: '6942',
      },
      {
        displayValue: '용산동사계절푸드앤도시락파크타워점',
        value: '6941',
      },
      {
        displayValue: '능동웨알유2',
        value: '6940',
      },
      {
        displayValue: '김포시행복한푸드학운6단지1',
        value: '6939',
      },
      {
        displayValue: '장지동나이스캐터링아이코리아점',
        value: '6938',
      },
      {
        displayValue: '화성시엄마손한식부페A',
        value: '6937',
      },
      {
        displayValue: '화성시주식회사초록도시개발',
        value: '6936',
      },
      {
        displayValue: '용인시나이스캐터링니코메디칼점1',
        value: '6935',
      },
      {
        displayValue: '연건동나이스캐터링서울대학교의과대점1',
        value: '6934',
      },
      {
        displayValue: '능평동나이스캐터링니코메디칼점1',
        value: '6933',
      },
      {
        displayValue: '광주시나이스캐터링라인물류',
        value: '6932',
      },
      {
        displayValue: '가락동나이스캐터링본점',
        value: '6931',
      },
      {
        displayValue: '화성시고을한식뷔페A',
        value: '6900',
      },
      {
        displayValue: '신흥동에스피씨지에프에스성남우체국점',
        value: '6899',
      },
      {
        displayValue: '용인시에르메스로직스구내식당',
        value: '6898',
      },
      {
        displayValue: '화성시(주)푸디스엘엔에프엔피씨몰텍지점',
        value: '6897',
      },
      {
        displayValue: '북아현동푸드윈3북성초등학교점',
        value: '6896',
      },
      {
        displayValue: '신동사랑방노인주간보호센터',
        value: '6895',
      },
      {
        displayValue: '평택시제이엘푸드로지스&네파점',
        value: '6894',
      },
      {
        displayValue: '합정동현대다우리한식뷔페',
        value: '6893',
      },
      {
        displayValue: '독산동서래본점',
        value: '6892',
      },
      {
        displayValue: '창영동이편한세상한식뷔페',
        value: '6891',
      },
      {
        displayValue: '평택시제이엘푸드평택세관특송물류센터점',
        value: '6890',
      },
      {
        displayValue: '천안시베스트푸드케터링쿠팡천안8센터점',
        value: '6889',
      },
      {
        displayValue: '원천동한가네셀프뷔페A',
        value: '6888',
      },
      {
        displayValue: '화성시밥향기한식뷔페',
        value: '6887',
      },
      {
        displayValue: '신림동남강고등학교2',
        value: '6886',
      },
      {
        displayValue: '안성시제이엘푸드SK네트웍스안성점',
        value: '6885',
      },
      {
        displayValue: '송도동집밥정여사와이엠티센터점',
        value: '6864',
      },
      {
        displayValue: '성곡동크로바한식뷔페',
        value: '6863',
      },
      {
        displayValue: '구천동주식회사와이앤케이두손노인전문요양원점',
        value: '6862',
      },
      {
        displayValue: '역삼동서래진선여자고등학교점',
        value: '6861',
      },
      {
        displayValue: '화성시만성한식뷔페',
        value: '6860',
      },
      {
        displayValue: '화성시온정에프엔비롯데제과공장점',
        value: '6859',
      },
      {
        displayValue: '고잔동동리구내식당',
        value: '6858',
      },
      {
        displayValue: '관양동착한한식부페',
        value: '6857',
      },
      {
        displayValue: '화성시고들한식부페A',
        value: '6856',
      },
      {
        displayValue: '화성시사계절밥상',
        value: '6855',
      },
      {
        displayValue: '신흥동씨제이프레시웨이자이푸르지오1단지점',
        value: '6854',
      },
      {
        displayValue: '원천동88뷔페',
        value: '6853',
      },
      {
        displayValue: '관양동금강푸드',
        value: '6852',
      },
      {
        displayValue: '운중동씨제이프레시웨이그리드위즈점',
        value: '6851',
      },
      {
        displayValue: '이천시워낭소리한식부페',
        value: '6850',
      },
      {
        displayValue: '김포시이수정웰빙한식뷔페',
        value: '6849',
      },
      {
        displayValue: '송도동행복한식당',
        value: '6848',
      },
      {
        displayValue: '오류동대성구내식당A',
        value: '6847',
      },
      {
        displayValue: '관양동원테이블A',
        value: '6828',
      },
      {
        displayValue: '아산시지씨에스탕정자이시티통합식당점',
        value: '6827',
      },
      {
        displayValue: '아산시지씨에스탕정자이시티직원식당점',
        value: '6826',
      },
      {
        displayValue: '성수동그린웰빙한식부페',
        value: '6825',
      },
      {
        displayValue: '성곡동누나네한식뷔페',
        value: '6824',
      },
      {
        displayValue: '성수동그린웰빙',
        value: '6823',
      },
      {
        displayValue: '화성시다온한식부페',
        value: '6822',
      },
      {
        displayValue: '독산동(주)서래본점',
        value: '6821',
      },
      {
        displayValue: '송도동집밥정여사',
        value: '6820',
      },
      {
        displayValue: '군자동세종사이버대학교구내식당',
        value: '6819',
      },
      {
        displayValue: '도당동알찬푸드B',
        value: '6818',
      },
      {
        displayValue: '금정동한림밥상',
        value: '6817',
      },
      {
        displayValue: '화곡동서래서울신정초등학교점',
        value: '6783',
      },
      {
        displayValue: '돈암동서래서울개운초등학교점',
        value: '6782',
      },
      {
        displayValue: '개봉동서래개웅중학교점',
        value: '6781',
      },
      {
        displayValue: '신정동서래서울갈산초등학교점',
        value: '6780',
      },
      {
        displayValue: '신길동서래대영중학교점',
        value: '6779',
      },
      {
        displayValue: '신정동서래서울양목초등학교점',
        value: '6778',
      },
      {
        displayValue: '독산동서래서울가산초등학교점',
        value: '6777',
      },
      {
        displayValue: '양평동박가네밥상',
        value: '6776',
      },
      {
        displayValue: '고잔동영일공업위탁급식소',
        value: '6775',
      },
      {
        displayValue: '상대원동밥플러스협동조합',
        value: '6774',
      },
      {
        displayValue: '안양동명지원푸드',
        value: '6773',
      },
      {
        displayValue: '평택시씨제이프레시웨이에이피알점',
        value: '6772',
      },
      {
        displayValue: '화성시사랑채한식뷔페',
        value: '6771',
      },
      {
        displayValue: '평택시현덕식당',
        value: '6770',
      },
      {
        displayValue: '화성시윤가네한식뷔페',
        value: '6769',
      },
      {
        displayValue: '방교동(주)푸디스엘엔에프대흥사지점',
        value: '6768',
      },
      {
        displayValue: '구의동블레싱테이블시티힐아카데미',
        value: '6767',
      },
      {
        displayValue: '성수동블레싱테이블빛의자녀학교',
        value: '6766',
      },
      {
        displayValue: '성성동지씨에스성성자이레이크파크점',
        value: '6765',
      },
      {
        displayValue: '도화동착한식당',
        value: '6764',
      },
      {
        displayValue: '보라동제이엘푸드아신기흥물류센터점',
        value: '6763',
      },
      {
        displayValue: '고잔동금강산업위탁급식소',
        value: '6762',
      },
      {
        displayValue: '평택시온정에프엔비지엘럭키로지스점',
        value: '6761',
      },
      {
        displayValue: '평택시황금밥상A',
        value: '6760',
      },
      {
        displayValue: '이천시푸드윈광주도예고등학교점',
        value: '6759',
      },
      {
        displayValue: '상대원동한상푸드',
        value: '6758',
      },
      {
        displayValue: '응암동푸드윈서울응암초등학교점',
        value: '6757',
      },
      {
        displayValue: '남양주시푸드윈광주덕소중학교점',
        value: '6756',
      },
      {
        displayValue: '홍제동푸드윈서울인왕초등학교점',
        value: '6755',
      },
      {
        displayValue: '거여동푸드윈서울거원초등학교점',
        value: '6754',
      },
      {
        displayValue: '신영동푸드윈서울세검정초등학교점',
        value: '6753',
      },
      {
        displayValue: '덕이동푸드윈서울고양예술고등학교점',
        value: '6752',
      },
      {
        displayValue: '오류동베스트푸드케터링쿠팡인천5센터점',
        value: '6751',
      },
      {
        displayValue: '신사동신구중학교',
        value: '6750',
      },
      {
        displayValue: '화성시디알한식뷔페',
        value: '6749',
      },
      {
        displayValue: '옥련동(주)본토푸드송도역현장점',
        value: '6748',
      },
      {
        displayValue: '성수동이야기가있는밥집',
        value: '6747',
      },
      {
        displayValue: '초지동미락식당',
        value: '6668',
      },
      {
        displayValue: '오류동공단중앙식당1',
        value: '6667',
      },
      {
        displayValue: '풍산동파티수하남미사점A',
        value: '6666',
      },
      {
        displayValue: '지제동울성리한식뷔페',
        value: '6665',
      },
      {
        displayValue: '새솔동푸드윈3새솔초등학교1',
        value: '6664',
      },
      {
        displayValue: '평택시푸짐한한식뷔페',
        value: '6663',
      },
      {
        displayValue: '지제동고향정',
        value: '6662',
      },
      {
        displayValue: '화성시파티수화성시청점',
        value: '6661',
      },
      {
        displayValue: '성수동찐미숯불구이',
        value: '6660',
      },
      {
        displayValue: '사노동디엔비푸드2',
        value: '6659',
      },
      {
        displayValue: '화성시소문난맛집',
        value: '6658',
      },
      {
        displayValue: '원시동엄마네밥상',
        value: '6657',
      },
      {
        displayValue: '도내동대우한식백반',
        value: '6656',
      },
      {
        displayValue: '정왕동(주)천아구내식당',
        value: '6655',
      },
      {
        displayValue: '삼성동해피락오크우드현장',
        value: '6654',
      },
      {
        displayValue: '금곡동동탄한식뷔페',
        value: '6653',
      },
      {
        displayValue: '화성시금성티에스씨구내식당',
        value: '6582',
      },
      {
        displayValue: '화성시신한한식뷔페A',
        value: '6581',
      },
      {
        displayValue: '화성시곱깨비',
        value: '6580',
      },
      {
        displayValue: '평택시모닝한식뷔페1',
        value: '6579',
      },
      {
        displayValue: '초지동신안산대학교학생식당',
        value: '6578',
      },
      {
        displayValue: '도일동큰집뷔페',
        value: '6577',
      },
      {
        displayValue: '북변동송이네',
        value: '6576',
      },
      {
        displayValue: '원곡동울엄마집밥',
        value: '6575',
      },
      {
        displayValue: '회현동주식회사동양캐터링우리은행본사지점A',
        value: '6530',
      },
      {
        displayValue: '문정동주식회사동양캐터링A',
        value: '6529',
      },
      {
        displayValue: '김포시맛동산온푸드',
        value: '6528',
      },
      {
        displayValue: '고잔동쉐프맘식탁',
        value: '6527',
      },
      {
        displayValue: '원곡동서울수제돈까스&한식뷔페',
        value: '6526',
      },
      {
        displayValue: '구로동에이치플러스자립병원',
        value: '6525',
      },
      {
        displayValue: '정왕동태산한식뷔페',
        value: '6524',
      },
      {
        displayValue: '정왕동한일식당1',
        value: '6523',
      },
      {
        displayValue: '가수동베스트푸드케터링세교현장점1A',
        value: '6522',
      },
      {
        displayValue: '보라동베스트푸드케터링아신물류센터점A',
        value: '6521',
      },
      {
        displayValue: '가장동베스트푸드케터링1A',
        value: '6520',
      },
      {
        displayValue: '용인시베스트푸드케터링몬즈컴퍼니점A',
        value: '6519',
      },
      {
        displayValue: '이천시베스트푸드케터링쿠팡이천4센터A',
        value: '6518',
      },
      {
        displayValue: '평택시베스트푸드케터링쿠팡평택5센터A',
        value: '6517',
      },
      {
        displayValue: '천안시베스트푸드케터링쿠팡천안6센터A',
        value: '6516',
      },
      {
        displayValue: '오야동씨제이프레시웨이성남거점',
        value: '6515',
      },
      {
        displayValue: '청천동소복소복한식뷔페',
        value: '6514',
      },
      {
        displayValue: '오류동한길한식뷔페',
        value: '6513',
      },
      {
        displayValue: '잠원동마미식당2',
        value: '6512',
      },
      {
        displayValue: '가산동태세라한식B',
        value: '6511',
      },
      {
        displayValue: '화성시대경한식뷔페',
        value: '6510',
      },
      {
        displayValue: '화성시더드림한식뷔페A',
        value: '6509',
      },
      {
        displayValue: '성곡동본가식당',
        value: '6508',
      },
      {
        displayValue: '화성시(주)원푸드다정요양원점',
        value: '6507',
      },
      {
        displayValue: '화성시(주)원푸드봄날요양원점',
        value: '6506',
      },
      {
        displayValue: '(위탁)일직동더좋은식판광명',
        value: '6505',
      },
      {
        displayValue: '송도동왕의밥상',
        value: '6489',
      },
      {
        displayValue: '용인시제이엘푸드파스토2센터점',
        value: '6486',
      },
      {
        displayValue: '용인시제이엘푸드파스토1센터점',
        value: '6485',
      },
      {
        displayValue: '용인시제이엘푸드백암이베이점',
        value: '6484',
      },
      {
        displayValue: '용인시제이엘푸드용마로지스점',
        value: '6483',
      },
      {
        displayValue: '화성시그린에프에스다원실버케어',
        value: '6482',
      },
      {
        displayValue: '도당동알찬푸드A',
        value: '6481',
      },
      {
        displayValue: '방배동깐부치킨사당역점',
        value: '6465',
      },
      {
        displayValue: '화성시구장리맛집한식부페',
        value: '6464',
      },
      {
        displayValue: '용인시나이스캐터링니코메디칼점',
        value: '6463',
      },
      {
        displayValue: '화성시소담골한식뷔페',
        value: '6462',
      },
      {
        displayValue: '용인시주주푸드본점',
        value: '6461',
      },
      {
        displayValue: '용인시주주푸드두신전자용인2공장점',
        value: '6460',
      },
      {
        displayValue: '청천동한샘셀프식당1',
        value: '6459',
      },
      {
        displayValue: '일직동은빛고을한식뷔페',
        value: '6458',
      },
      {
        displayValue: '수유동(주)굿모닝실버푸드희망데이케어센터점',
        value: '6457',
      },
      {
        displayValue: '수유동(주)굿모닝실버푸드The행복한데이케어센터점',
        value: '6456',
      },
      {
        displayValue: '신정동푸드윈서울계남초등학교점',
        value: '6455',
      },
      {
        displayValue: '신설동푸드윈서울대광중고등학교점',
        value: '6454',
      },
      {
        displayValue: '광주시쌍용한식뷔페',
        value: '6453',
      },
      {
        displayValue: '원시동하이테크구내식당1',
        value: '6452',
      },
      {
        displayValue: '고덕동고덕부녀회한식뷔페2호점',
        value: '6451',
      },
      {
        displayValue: '평택시고덕부녀회한식뷔페1호점',
        value: '6450',
      },
      {
        displayValue: '화성시맛있는밥상뷔페',
        value: '6449',
      },
      {
        displayValue: '시흥동원푸드금천구청역점',
        value: '6420',
      },
      {
        displayValue: '화성시모아모아한식뷔페',
        value: '6419',
      },
      {
        displayValue: '용인시씨제이프레시웨이코코도르점1',
        value: '6418',
      },
      {
        displayValue: '가현동엄마손한식부페',
        value: '6417',
      },
      {
        displayValue: '북변동가정식자연밥상이규택수학학원',
        value: '6416',
      },
      {
        displayValue: '장기동가정식자연밥상대치상상학원점',
        value: '6415',
      },
      {
        displayValue: '세곡동강남구립행복요양병원',
        value: '6414',
      },
      {
        displayValue: '파주시씨제이프레시웨이CJENM스튜디오센터점',
        value: '6413',
      },
      {
        displayValue: '오전동미르한식뷔페1',
        value: '6412',
      },
      {
        displayValue: '회정동시골집한식뷔페',
        value: '6411',
      },
      {
        displayValue: '옥련동말숙이네',
        value: '6410',
      },
      {
        displayValue: '당정동장금이한식뷔페',
        value: '6409',
      },
      {
        displayValue: '관양동왕의밥상1',
        value: '6408',
      },
      {
        displayValue: '마곡동시골밥상백반A',
        value: '6407',
      },
      {
        displayValue: '문형동주주푸드SSG닷컴오포센터점',
        value: '6406',
      },
      {
        displayValue: '금정동다인1',
        value: '6405',
      },
      {
        displayValue: '방교동씨제이프레시웨이코리아인스트루먼트점',
        value: '6404',
      },
      {
        displayValue: '호계동에스케이이룸푸드1',
        value: '6403',
      },
      {
        displayValue: '김포시가정식자연밥상',
        value: '6395',
      },
      {
        displayValue: '용인시주주푸드오산차고지점',
        value: '6394',
      },
      {
        displayValue: '화성시금풍식당',
        value: '6393',
      },
      {
        displayValue: '화성시다모아한식뷔페',
        value: '6392',
      },
      {
        displayValue: '화성시평화한식뷔페',
        value: '6391',
      },
      {
        displayValue: '운서동인천공항정비소A',
        value: '6390',
      },
      {
        displayValue: '잠원동해피락서초',
        value: '6389',
      },
      {
        displayValue: '화성시푸짐한한식뷔페',
        value: '6385',
      },
      {
        displayValue: '용인시행복푸드서비스',
        value: '6384',
      },
      {
        displayValue: '가좌동더(THE)조은밥상부광금속점',
        value: '6383',
      },
      {
        displayValue: '화성시성광',
        value: '6382',
      },
      {
        displayValue: '화성시네츄럴푸드가재울재활요양원점',
        value: '6381',
      },
      {
        displayValue: '원창동미미식당',
        value: '6380',
      },
      {
        displayValue: '삼정동소담골',
        value: '6379',
      },
      {
        displayValue: '화성시행복찬합도시락1',
        value: '6378',
      },
      {
        displayValue: '정왕동큰나무식당',
        value: '6377',
      },
      {
        displayValue: '광주시맛드림한정식1',
        value: '6376',
      },
      {
        displayValue: '원흥동(주)더바른푸드1',
        value: '6375',
      },
      {
        displayValue: '논현동영도푸드',
        value: '6374',
      },
      {
        displayValue: '화성시한식뷔페영의정아는공부학원점1',
        value: '6373',
      },
      {
        displayValue: '갈현동영자와병태',
        value: '6372',
      },
      {
        displayValue: '동춘동대일위탁급식소복지관점',
        value: '6371',
      },
      {
        displayValue: '화성시수촌리행운한식뷔페A',
        value: '6363',
      },
      {
        displayValue: '신월동(주)파인쿡',
        value: '6361',
      },
      {
        displayValue: '정왕동푸짐한밥상',
        value: '6360',
      },
      {
        displayValue: '평택시도곡중학교',
        value: '6353',
      },
      {
        displayValue: '안성시동원홈푸드씨엔에프3공장점',
        value: '6352',
      },
      {
        displayValue: '농서동정담은밥상A',
        value: '6351',
      },
      {
        displayValue: '고잔동정송위탁급식소1',
        value: '6350',
      },
      {
        displayValue: '화성시웰빙만나한식뷔페',
        value: '6349',
      },
      {
        displayValue: '상현동요즘집밥',
        value: '6348',
      },
      {
        displayValue: '화성시정남한식뷔페1',
        value: '6347',
      },
      {
        displayValue: '서초동응야끼도리',
        value: '6346',
      },
      {
        displayValue: '이의동명가한식뷔페1',
        value: '6345',
      },
      {
        displayValue: '화성시늘푸른한식뷔페',
        value: '6329',
      },
      {
        displayValue: '문정동테라한식뷔페',
        value: '6328',
      },
      {
        displayValue: '고잔동진영열처리위탁급식소',
        value: '6327',
      },
      {
        displayValue: '구월동장금이한식뷔페',
        value: '6326',
      },
      {
        displayValue: '화성시행운한식부페1',
        value: '6325',
      },
      {
        displayValue: '역삼동파인쿡하이퍼학원의대관점',
        value: '6324',
      },
      {
        displayValue: '역삼동파인쿡하이퍼학원점',
        value: '6323',
      },
      {
        displayValue: '평택시모닝한식뷔페본점',
        value: '6322',
      },
      {
        displayValue: '공세동씨제이프레시웨이한국알콜산업점1',
        value: '6321',
      },
      {
        displayValue: '상암동(주)델리에프에스델리산학협력센터점',
        value: '6320',
      },
      {
        displayValue: '중대동푸드윈광주',
        value: '6319',
      },
      {
        displayValue: '영천동소담한식뷔페',
        value: '6318',
      },
      {
        displayValue: '사송동씨제이프레시웨이판교거점',
        value: '6317',
      },
      {
        displayValue: '상대원동고향한식뷔페',
        value: '6316',
      },
      {
        displayValue: '반정동고향한식부페',
        value: '6315',
      },
      {
        displayValue: '자양동마더앤찬신양초등학교점1',
        value: '6314',
      },
      {
        displayValue: '화성시위트구내식당',
        value: '6304',
      },
      {
        displayValue: '장지동주주푸드동탄2버스공영차고지점',
        value: '6303',
      },
      {
        displayValue: '평택시따뜻한밥',
        value: '6302',
      },
      {
        displayValue: '가능동곰서방푸드',
        value: '6301',
      },
      {
        displayValue: '천호동도시락yea!2',
        value: '6300',
      },
      {
        displayValue: '가산동호반푸드',
        value: '6299',
      },
      {
        displayValue: '화성시장금이한식뷔페어은리점',
        value: '6298',
      },
      {
        displayValue: '화성시장모님밥상',
        value: '6297',
      },
      {
        displayValue: '갈현동코노니아은평점1',
        value: '6296',
      },
      {
        displayValue: '영통동휴먼에코푸드자이센트럴파크점1',
        value: '6295',
      },
      {
        displayValue: '배양동소울푸드1',
        value: '6294',
      },
      {
        displayValue: '신천동밥이보약',
        value: '6293',
      },
      {
        displayValue: '휘경동소담찬',
        value: '6292',
      },
      {
        displayValue: '서산시현대그린푸드현대트랜시스성연점',
        value: '6283',
      },
      {
        displayValue: '상현동맛드림한식뷔페',
        value: '6282',
      },
      {
        displayValue: '성곡동미소식당1',
        value: '6281',
      },
      {
        displayValue: '평택시모닝한식뷔페',
        value: '6280',
      },
      {
        displayValue: '원시동삼오정식당',
        value: '6279',
      },
      {
        displayValue: '지산동따신밥상한식뷔페A',
        value: '6278',
      },
      {
        displayValue: '고잔동예당위탁급식소',
        value: '6277',
      },
      {
        displayValue: '만석동이레식당',
        value: '6276',
      },
      {
        displayValue: '화성시돈가스무한리필한식부페A',
        value: '6275',
      },
      {
        displayValue: '원시동자연밥상한식뷔페1',
        value: '6274',
      },
      {
        displayValue: '원천동한가네셀프뷔페',
        value: '6273',
      },
      {
        displayValue: '화성시아리랑한식뷔페',
        value: '6272',
      },
      {
        displayValue: '삼선동엄마손맛한식뷔페',
        value: '6271',
      },
      {
        displayValue: '화성시한식뷔페영의정장덕리점1',
        value: '6270',
      },
      {
        displayValue: '원당동명동한식중식뷔페',
        value: '6268',
      },
      {
        displayValue: '화성시한식뷔페영의정장덕리점',
        value: '6267',
      },
      {
        displayValue: '기안동네츄럴푸드더조은재활요양원점',
        value: '6266',
      },
      {
        displayValue: '화성시명가한식뷔페A',
        value: '6265',
      },
      {
        displayValue: '화성시신세계한식뷔페',
        value: '6264',
      },
      {
        displayValue: '거여동차가네부페',
        value: '6263',
      },
      {
        displayValue: '내동모아한식뷔페',
        value: '6262',
      },
      {
        displayValue: '관철동아틀리에송1',
        value: '6257',
      },
      {
        displayValue: '화성시우정한식부페A',
        value: '6256',
      },
      {
        displayValue: '이천시씨제이프레시웨이HK이노엔점',
        value: '6248',
      },
      {
        displayValue: '이천시마장고등학교',
        value: '6247',
      },
      {
        displayValue: '잠원동에이치피아이구내식당',
        value: '6246',
      },
      {
        displayValue: '풍산동데일리푸드',
        value: '6245',
      },
      {
        displayValue: '화성시그린푸드다원실버케어',
        value: '6244',
      },
      {
        displayValue: '추자동수야정식',
        value: '6243',
      },
      {
        displayValue: '운양동파티수김포운양점',
        value: '6242',
      },
      {
        displayValue: '문정동명인푸드',
        value: '6241',
      },
      {
        displayValue: '김포시행운밥상행복국수1',
        value: '6236',
      },
      {
        displayValue: '용답동그린스푼',
        value: '6235',
      },
      {
        displayValue: '망월동맘마',
        value: '6234',
      },
      {
        displayValue: '상대원동가원',
        value: '6233',
      },
      {
        displayValue: '향동동파티수고양점',
        value: '6232',
      },
      {
        displayValue: '화성시누리네한식부페',
        value: '6231',
      },
      {
        displayValue: '천안시네츄럴푸드제일좋은요양원점',
        value: '6216',
      },
      {
        displayValue: '구갈동그린푸드',
        value: '6215',
      },
      {
        displayValue: '마곡동진푸드',
        value: '6214',
      },
      {
        displayValue: '성곡동영월한상식당',
        value: '6213',
      },
      {
        displayValue: '광주시백록민들레',
        value: '6212',
      },
      {
        displayValue: '둔촌동강동푸드원1',
        value: '6211',
      },
      {
        displayValue: '평택시만나한식부페서탄점',
        value: '6210',
      },
      {
        displayValue: '논현동(주)본토푸드신협전자점',
        value: '6209',
      },
      {
        displayValue: '갈현동황금밥상',
        value: '6208',
      },
      {
        displayValue: '고덕동다모아한식뷔페',
        value: '6207',
      },
      {
        displayValue: '화성시향남읍명품한식뷔페',
        value: '6206',
      },
      {
        displayValue: '항동연안부두식당',
        value: '6205',
      },
      {
        displayValue: '관훈동베데스다식당',
        value: '6204',
      },
      {
        displayValue: '정왕동해남1',
        value: '6203',
      },
      {
        displayValue: '오류동정가네한식뷔페',
        value: '6202',
      },
      {
        displayValue: '안성시급식연구소',
        value: '6201',
      },
      {
        displayValue: '고덕동고덕부녀회한식뷔페대보건설현장점',
        value: '6200',
      },
      {
        displayValue: '노량진동영자와병태야한식뷔페',
        value: '6199',
      },
      {
        displayValue: '원동풍농식당',
        value: '6198',
      },
      {
        displayValue: '당정동센트럴푸드',
        value: '6197',
      },
      {
        displayValue: '신동원푸드코리아',
        value: '6190',
      },
      {
        displayValue: '고잔동대명구내매점식당',
        value: '6189',
      },
      {
        displayValue: '계산동미림출장뷔페',
        value: '6188',
      },
      {
        displayValue: '평택시보경푸드',
        value: '6187',
      },
      {
        displayValue: '사근동(주)서래한양대학교사범대학부속고등학교점',
        value: '6186',
      },
      {
        displayValue: '석남동베스트푸드케터링인천쿠팡31센터',
        value: '6185',
      },
      {
        displayValue: '남촌동대일위탁급식소1',
        value: '6184',
      },
      {
        displayValue: '신흥동해정식당1',
        value: '6183',
      },
      {
        displayValue: '안양동삼시세끼',
        value: '6182',
      },
      {
        displayValue: '화성시삼시세끼한식뷔페A',
        value: '6181',
      },
      {
        displayValue: '화성시한아름한식뷔페',
        value: '6180',
      },
      {
        displayValue: '고잔동조앤스마일위탁급식소',
        value: '6179',
      },
      {
        displayValue: '화성시다온한식뷔페팔탄점',
        value: '6174',
      },
      {
        displayValue: '내발산동덕원여자고등학교',
        value: '6173',
      },
      {
        displayValue: '관양동왕의밥상',
        value: '6172',
      },
      {
        displayValue: '화성시맛고을한식부페',
        value: '6171',
      },
      {
        displayValue: '운서동행복식당',
        value: '6170',
      },
      {
        displayValue: '풍덕천동케이에스푸드A',
        value: '6169',
      },
      {
        displayValue: '김포시정가네퓨전한식부페',
        value: '6168',
      },
      {
        displayValue: '목내동부성식당',
        value: '6159',
      },
      {
        displayValue: '거여동거원초등학교',
        value: '6158',
      },
      {
        displayValue: '면목동중곡초등학교',
        value: '6157',
      },
      {
        displayValue: '화성시전주한식뷔페',
        value: '6156',
      },
      {
        displayValue: '성곡동행복한밥상C',
        value: '6155',
      },
      {
        displayValue: '김포시네츄럴푸드굿닥터재활요양원점',
        value: '6154',
      },
      {
        displayValue: '계산동계양우체국식당',
        value: '6153',
      },
      {
        displayValue: '천안시베스트푸드케터링쿠팡천안6센터',
        value: '6152',
      },
      {
        displayValue: '청천동밥이야',
        value: '6148',
      },
      {
        displayValue: '화성시차돌고개식당비비안점',
        value: '6147',
      },
      {
        displayValue: '계수동대성한식부페',
        value: '6146',
      },
      {
        displayValue: '신길동정우행복밥상',
        value: '6145',
      },
      {
        displayValue: '계수동전주한식뷔페2호점',
        value: '6144',
      },
      {
        displayValue: '풍덕천동씨제이프레시웨이수지광교산아이파크점',
        value: '6143',
      },
      {
        displayValue: '화성시영양밥상한식뷔페1',
        value: '6142',
      },
      {
        displayValue: '역삼동거평식당',
        value: '6141',
      },
      {
        displayValue: '동천동동천한식뷔페',
        value: '6140',
      },
      {
        displayValue: '가좌동대박구내식당',
        value: '6139',
      },
      {
        displayValue: '태전동백록사계절',
        value: '6138',
      },
      {
        displayValue: '화성시삼시세끼',
        value: '6137',
      },
      {
        displayValue: '대치동도곡초등학교',
        value: '6130',
      },
      {
        displayValue: '미아동솔샘고등학교1',
        value: '6129',
      },
      {
        displayValue: '문정동문덕초등학교',
        value: '6128',
      },
      {
        displayValue: '운학동푸드윈봉화부대점',
        value: '6127',
      },
      {
        displayValue: '갈현동주식회사중앙푸드',
        value: '6126',
      },
      {
        displayValue: '고덕동오고또와',
        value: '6125',
      },
      {
        displayValue: '평택시베스트푸드케터링쿠팡평택5센터',
        value: '6124',
      },
      {
        displayValue: '화성시강남밥상',
        value: '6123',
      },
      {
        displayValue: '이천시베스트푸드케터링쿠팡이천4센터',
        value: '6122',
      },
      {
        displayValue: '안성시칠곡명가밥상1',
        value: '6121',
      },
      {
        displayValue: '가락동석촌중학교',
        value: '6120',
      },
      {
        displayValue: '서현동에스피씨지에프에스분당우체국점',
        value: '6119',
      },
      {
        displayValue: '개포동대진초등학교',
        value: '6118',
      },
      {
        displayValue: '용인시국수집',
        value: '6117',
      },
      {
        displayValue: '갈곶동주주푸드오산차고지점',
        value: '6116',
      },
      {
        displayValue: '동춘동참새식당',
        value: '6115',
      },
      {
        displayValue: '반포동서원초등학교',
        value: '6114',
      },
      {
        displayValue: '잠실동서울신천초등학교',
        value: '6113',
      },
      {
        displayValue: '신흥동해정식당',
        value: '6112',
      },
      {
        displayValue: '상도동서울강남초등학교',
        value: '6111',
      },
      {
        displayValue: '방학동서울초당초등학교',
        value: '6110',
      },
      {
        displayValue: '신림동서울신성초등학교',
        value: '6109',
      },
      {
        displayValue: '서초동신중초등학교',
        value: '6108',
      },
      {
        displayValue: '오산동해정식당',
        value: '6107',
      },
      {
        displayValue: '문래동문래중학교',
        value: '6106',
      },
      {
        displayValue: '삼성동삼릉초등학교',
        value: '5079',
      },
      {
        displayValue: '성곡동건강한밥상2호점',
        value: '5078',
      },
      {
        displayValue: '서초동서초초등학교',
        value: '5077',
      },
      {
        displayValue: '신설동수랏간한식부페',
        value: '5076',
      },
      {
        displayValue: '풍납동토성초등학교',
        value: '5075',
      },
      {
        displayValue: '청운동청운초등학교',
        value: '5074',
      },
      {
        displayValue: '신천동잠동초등학교',
        value: '5073',
      },
      {
        displayValue: '성곡동건강한밥상',
        value: '5072',
      },
      {
        displayValue: '상일동상일중학교',
        value: '5071',
      },
      {
        displayValue: '상일동상일여자고등학교',
        value: '5070',
      },
      {
        displayValue: '무지내동엄마손한식부페',
        value: '5069',
      },
      {
        displayValue: '고색동명성푸드',
        value: '5068',
      },
      {
        displayValue: '화성시장안면행복한식뷔페',
        value: '5067',
      },
      {
        displayValue: '문봉동대박부페',
        value: '5066',
      },
      {
        displayValue: '광장동광남중학교1',
        value: '5065',
      },
      {
        displayValue: '화성시진달래한식뷔페',
        value: '5064',
      },
      {
        displayValue: '평택시우리집자연밥상',
        value: '5063',
      },
      {
        displayValue: '가산동해피타임',
        value: '5062',
      },
      {
        displayValue: '김포시민영기사부페',
        value: '5061',
      },
      {
        displayValue: '개포동개원초등학교1',
        value: '5060',
      },
      {
        displayValue: '원시동건강한밥상',
        value: '5059',
      },
      {
        displayValue: '대치동휘문중학교',
        value: '5058',
      },
      {
        displayValue: '덕은동씨제이프레시웨이글룩점',
        value: '5057',
      },
      {
        displayValue: '화성시삼시세끼한식뷔페대현에스티점',
        value: '5056',
      },
      {
        displayValue: '사노동푸드포레',
        value: '5055',
      },
      {
        displayValue: '역삼동역삼중학교',
        value: '5054',
      },
      {
        displayValue: '화성시삼시세끼한식뷔페동일씨엔이점',
        value: '5053',
      },
      {
        displayValue: '용인시동원구내식당',
        value: '5052',
      },
      {
        displayValue: '화성시다래가마솥한식뷔페1',
        value: '5048',
      },
      {
        displayValue: '평택시뜰안채',
        value: '5047',
      },
      {
        displayValue: '장항동통큰밥상',
        value: '5046',
      },
      {
        displayValue: '오산동동원홈푸드켄탈스퀘어오산DC점',
        value: '5045',
      },
      {
        displayValue: '화성시남도한식뷔페',
        value: '5041',
      },
      {
        displayValue: '화성시향남읍행복한식부페',
        value: '5040',
      },
      {
        displayValue: '김포시미소밥상A',
        value: '5039',
      },
      {
        displayValue: '용이동제이아이푸드시스템평택대학교학생식당',
        value: '5038',
      },
      {
        displayValue: '화성시부영한식뷔페A',
        value: '5037',
      },
      {
        displayValue: '화성시삼진식당',
        value: '5028',
      },
      {
        displayValue: '역삼동진선여자고등학교',
        value: '5027',
      },
      {
        displayValue: '화성시네츄럴푸드행복플러스요양원점',
        value: '5026',
      },
      {
        displayValue: '이의동다온한식뷔페',
        value: '5025',
      },
      {
        displayValue: '쌍용동네츄럴푸드양지요양원점',
        value: '5024',
      },
      {
        displayValue: '평택시VIP푸드1',
        value: '5023',
      },
      {
        displayValue: '판교동(주)보뜨래푸드판교도서관점',
        value: '5022',
      },
      {
        displayValue: '성곡동보미한식뷔페',
        value: '5021',
      },
      {
        displayValue: '개포동개현초등학교1',
        value: '5020',
      },
      {
        displayValue: '안양동한샘푸드',
        value: '5019',
      },
      {
        displayValue: '역삼동황금식당',
        value: '5018',
      },
      {
        displayValue: '김포시만나한식뷔페',
        value: '5017',
      },
      {
        displayValue: '구산동아워홈은평의마을점',
        value: '5016',
      },
      {
        displayValue: '용두동(주)더드림케이터링2',
        value: '5015',
      },
      {
        displayValue: '구산동씨제이프레시웨이은평의마을점',
        value: '5014',
      },
      {
        displayValue: '원창동베스트푸드케터링인천쿠팡23센터1',
        value: '5013',
      },
      {
        displayValue: '원창동베스트푸드케터링인천쿠팡23센터2',
        value: '5012',
      },
      {
        displayValue: '석남동베스트푸드케터링인천쿠팡30센터',
        value: '5011',
      },
      {
        displayValue: '망월동김쉐프',
        value: '5010',
      },
      {
        displayValue: '방배동차반1',
        value: '5009',
      },
      {
        displayValue: '화성시향남읍호남식당',
        value: '5008',
      },
      {
        displayValue: '회현동주식회사동양캐터링우리은행본사지점',
        value: '5007',
      },
      {
        displayValue: '문정동주식회사동양캐터링',
        value: '5006',
      },
      {
        displayValue: '안성시한식부페1',
        value: '5005',
      },
      {
        displayValue: '계수동전주한식부페',
        value: '5004',
      },
      {
        displayValue: '안성시맛뜰한식뷔페',
        value: '4993',
      },
      {
        displayValue: '정왕동부원식당',
        value: '4992',
      },
      {
        displayValue: '상동명성백반',
        value: '4991',
      },
      {
        displayValue: '영등포동제일식당',
        value: '4990',
      },
      {
        displayValue: '화성시자연밥상',
        value: '4989',
      },
      {
        displayValue: '화성시마니무한식부페',
        value: '4988',
      },
      {
        displayValue: '화성시양감면맛나한식부페',
        value: '4987',
      },
      {
        displayValue: '평택시전주한식부페',
        value: '4986',
      },
      {
        displayValue: '화성시서신면맛있는밥집',
        value: '4971',
      },
      {
        displayValue: '광주시복사골식당',
        value: '4970',
      },
      {
        displayValue: '남양주시기사식당한식부페',
        value: '4969',
      },
      {
        displayValue: '세류동시골집한식부페',
        value: '4968',
      },
      {
        displayValue: '화성시식도락가1',
        value: '4967',
      },
      {
        displayValue: '김포시수인푸드',
        value: '4966',
      },
      {
        displayValue: '화성시한식뷔페영의정신남리점',
        value: '4965',
      },
      {
        displayValue: '김포시아베끄뚜아케이터링',
        value: '4964',
      },
      {
        displayValue: '삼성동바른식탁',
        value: '4963',
      },
      {
        displayValue: '목내동천우식당',
        value: '4962',
      },
      {
        displayValue: '고잔동한림상사위탁급식소',
        value: '4961',
      },
      {
        displayValue: '평택시명가한식뷔페',
        value: '4960',
      },
      {
        displayValue: '용인시굴뚝한식부페',
        value: '4959',
      },
      {
        displayValue: '고등동소방재난본부',
        value: '4958',
      },
      {
        displayValue: '평동미소식당',
        value: '4957',
      },
      {
        displayValue: '둔촌동강동푸드원A',
        value: '4956',
      },
      {
        displayValue: '성곡동미소식당',
        value: '4955',
      },
      {
        displayValue: '양재동원푸드코리아',
        value: '4954',
      },
      {
        displayValue: '남촌동우진공업위탁급식소A',
        value: '4953',
      },
      {
        displayValue: '망월동주식회사위니드A',
        value: '4952',
      },
      {
        displayValue: '목내동엉겅퀴한식부페',
        value: '4951',
      },
      {
        displayValue: '정왕동마을식당본점',
        value: '4950',
      },
      {
        displayValue: '새솔동푸드윈3새솔초등학교',
        value: '4949',
      },
      {
        displayValue: '남촌동나노앤텍위탁급식소1',
        value: '4947',
      },
      {
        displayValue: '김포시씨제이프레시웨이태웅메디칼점',
        value: '4946',
      },
      {
        displayValue: '신동사랑방노인복지센터',
        value: '4942',
      },
      {
        displayValue: '오류동대성구내식당',
        value: '4941',
      },
      {
        displayValue: '고색동(주)더제이푸드수원점',
        value: '4940',
      },
      {
        displayValue: '중대동푸드윈광주국군의날_숙영지',
        value: '4939',
      },
      {
        displayValue: '영덕동서임한식부페지식산업센터점',
        value: '4924',
      },
      {
        displayValue: '덕풍동리쉐프도시락',
        value: '4923',
      },
      {
        displayValue: '가좌동호호한식뷔페',
        value: '4922',
      },
      {
        displayValue: '영천동파티수동탄역점A',
        value: '4921',
      },
      {
        displayValue: '화성시맛있는밥집',
        value: '4920',
      },
      {
        displayValue: '이의동라운지밥',
        value: '4919',
      },
      {
        displayValue: '평택시부자식당한식부페',
        value: '4918',
      },
      {
        displayValue: '화성시따뜻한밥상해병대사령부지점',
        value: '4917',
      },
      {
        displayValue: '덕풍동우리푸드',
        value: '4916',
      },
      {
        displayValue: '도당동알찬푸드',
        value: '4915',
      },
      {
        displayValue: '정왕동진수성찬한식뷔페대성정밀기계점',
        value: '4914',
      },
      {
        displayValue: '상갈동VIP푸드신갈고등학교점',
        value: '4913',
      },
      {
        displayValue: '정왕동자연밥집',
        value: '4912',
      },
      {
        displayValue: '운남동한샘푸드푸드뱅크점',
        value: '4911',
      },
      {
        displayValue: '가정동가정한식부페',
        value: '4910',
      },
      {
        displayValue: '김포시맛그린한식부페',
        value: '4909',
      },
      {
        displayValue: '초지동신안산대학교교직원식당',
        value: '4908',
      },
      {
        displayValue: '안양동산들푸드연성대점2',
        value: '4906',
      },
      {
        displayValue: '화성시다미향웰빙한식부페',
        value: '4905',
      },
      {
        displayValue: '서계동배문고등학교',
        value: '4904',
      },
      {
        displayValue: '서계동배문중학교',
        value: '4903',
      },
      {
        displayValue: '성곡동원천식당',
        value: '4902',
      },
      {
        displayValue: '창동에이텍푸드',
        value: '4901',
      },
      {
        displayValue: '호계동끼니',
        value: '4900',
      },
      {
        displayValue: '당동푸드윈국군의날_숙영지',
        value: '4899',
      },
      {
        displayValue: '고등동푸드윈국군의날_서울공항석식',
        value: '4898',
      },
      {
        displayValue: '고등동푸드윈국군의날_서울공항중식',
        value: '4897',
      },
      {
        displayValue: '고등동푸드윈국군의날_서울공항조식',
        value: '4896',
      },
      {
        displayValue: '화성시니즈푸드',
        value: '4895',
      },
      {
        displayValue: '양평동남부노동부',
        value: '4894',
      },
      {
        displayValue: '증산동푸드윈서울증산초등학교',
        value: '4893',
      },
      {
        displayValue: '송도동행복한밥상',
        value: '4871',
      },
      {
        displayValue: '성곡동미소밥상A',
        value: '4870',
      },
      {
        displayValue: '인계동퓨전한식뷔페',
        value: '4869',
      },
      {
        displayValue: '농서동장금이한식뷔페',
        value: '4868',
      },
      {
        displayValue: '대화동더드림한식부페',
        value: '4867',
      },
      {
        displayValue: '화성시다래가마솥한식뷔페',
        value: '4866',
      },
      {
        displayValue: '고잔동대정식당',
        value: '4865',
      },
      {
        displayValue: '청천동청천한식뷔페',
        value: '4864',
      },
      {
        displayValue: '신림동남강중학교',
        value: '4863',
      },
      {
        displayValue: '관양동소나무한식뷔페',
        value: '4862',
      },
      {
        displayValue: '이천시향림푸드시스템',
        value: '4861',
      },
      {
        displayValue: '용인시좋은나무한식뷔페1',
        value: '4860',
      },
      {
        displayValue: '용인시베스트푸드케터링몬즈컴퍼니점',
        value: '4859',
      },
      {
        displayValue: '목내동신광식당A',
        value: '4858',
      },
      {
        displayValue: '팔곡이동한성식당',
        value: '4857',
      },
      {
        displayValue: '역삼동오늘식당',
        value: '4856',
      },
      {
        displayValue: '광주시정푸드1',
        value: '4855',
      },
      {
        displayValue: '화성시동원홈푸드조이스세이프티점',
        value: '4851',
      },
      {
        displayValue: '신읍동우리에프앤비처음처럼노인주간돌봄센터점',
        value: '4850',
      },
      {
        displayValue: '구월동장금이밥상',
        value: '4849',
      },
      {
        displayValue: '도화동두리반',
        value: '4834',
      },
      {
        displayValue: '마곡동맘스푸드A',
        value: '4833',
      },
      {
        displayValue: '광주시그집에가면',
        value: '4832',
      },
      {
        displayValue: '신천동부뚜막한식부페',
        value: '4831',
      },
      {
        displayValue: '정왕동마을식당',
        value: '4830',
      },
      {
        displayValue: '영통동휴먼에코푸드자이센트럴파크점',
        value: '4829',
      },
      {
        displayValue: '화성시한식뷔페영의정아는공부학원점',
        value: '4828',
      },
      {
        displayValue: '용현동(주)본토푸드현대관리동점',
        value: '4827',
      },
      {
        displayValue: '도화동찬이랑밥이랑',
        value: '4826',
      },
      {
        displayValue: '서초동씨제이프레시웨이하루플란트치과점',
        value: '4825',
      },
      {
        displayValue: '오금동맛깔촌',
        value: '4824',
      },
      {
        displayValue: '화성시에이원구내식당',
        value: '4823',
      },
      {
        displayValue: '서창동이모네밥상',
        value: '4822',
      },
      {
        displayValue: '평택시은성한식뷔페',
        value: '4821',
      },
      {
        displayValue: '화성시수촌리행운한식뷔페',
        value: '4820',
      },
      {
        displayValue: '정왕동정우식당',
        value: '4819',
      },
      {
        displayValue: '정왕동세운식당',
        value: '4818',
      },
      {
        displayValue: '원창동베스트푸드케터링쿠팡인천13센터점',
        value: '4816',
      },
      {
        displayValue: '운양동진앤푸드',
        value: '4815',
      },
      {
        displayValue: '양재동킴스치킨포차1',
        value: '4814',
      },
      {
        displayValue: '평택시호남한식뷔페드림산단점',
        value: '4812',
      },
      {
        displayValue: '역삼동시크릿푸드',
        value: '4811',
      },
      {
        displayValue: '송도동지씨에스송도자이풍경채점',
        value: '4810',
      },
      {
        displayValue: '가좌동스마트구내식당1',
        value: '4809',
      },
      {
        displayValue: '상대원동214컴퍼니',
        value: '4808',
      },
      {
        displayValue: '이천시씨제이프레시웨이쿠팡이천2센터점',
        value: '4807',
      },
      {
        displayValue: '화성시네츄럴푸드봄날요양원점',
        value: '4803',
      },
      {
        displayValue: '지산동따신밥상한식뷔페',
        value: '4802',
      },
      {
        displayValue: '화성시이강김푸드남영비비안점',
        value: '4801',
      },
      {
        displayValue: '다산동봄봄다산점',
        value: '4800',
      },
      {
        displayValue: '향동동봄봄향동점',
        value: '4799',
      },
      {
        displayValue: '화성시화진A',
        value: '4798',
      },
      {
        displayValue: '파주시시골밥집한식뷔페',
        value: '4797',
      },
      {
        displayValue: '신동김셰프의집밥1',
        value: '4796',
      },
      {
        displayValue: '고천동서울소년원',
        value: '4795',
      },
      {
        displayValue: '평택시만나한식부페1',
        value: '4794',
      },
      {
        displayValue: '고잔동참새한식뷔페',
        value: '4793',
      },
      {
        displayValue: '신길동제일한식부페',
        value: '4792',
      },
      {
        displayValue: '목내동수성상회푸드웰유니테크점',
        value: '4787',
      },
      {
        displayValue: '고잔동대명구내식당',
        value: '4786',
      },
      {
        displayValue: '상대원동데일리푸드',
        value: '4785',
      },
      {
        displayValue: '논현동구뜰A',
        value: '4784',
      },
      {
        displayValue: '마곡동(주)본토푸드귀뚜라미연구소점A',
        value: '4783',
      },
      {
        displayValue: '화성시압구정한식부페',
        value: '4782',
      },
      {
        displayValue: '정왕동영광식당',
        value: '4781',
      },
      {
        displayValue: '등촌동행복도시락3712',
        value: '4780',
      },
      {
        displayValue: '갈현동코노니아은평점',
        value: '4779',
      },
      {
        displayValue: '간석동기운찬집밥A',
        value: '4778',
      },
      {
        displayValue: '자양동마더앤찬신양초등학교점',
        value: '4777',
      },
      {
        displayValue: '궐동여주웰빙한식뷔페A',
        value: '4776',
      },
      {
        displayValue: '신림동양지병원',
        value: '4750',
      },
      {
        displayValue: '화성시남양읍행복한밥상1',
        value: '4749',
      },
      {
        displayValue: '청천동착한식당',
        value: '4748',
      },
      {
        displayValue: '김포시행복한밥상A',
        value: '4747',
      },
      {
        displayValue: '평택시바른푸드한식뷔페',
        value: '4746',
      },
      {
        displayValue: '지제동해와달한식뷔페A',
        value: '4745',
      },
      {
        displayValue: '원시동하이테크구내식당',
        value: '4744',
      },
      {
        displayValue: '화성시서진한식부페',
        value: '4743',
      },
      {
        displayValue: '평택시더드림한식뷔페',
        value: '4742',
      },
      {
        displayValue: '정왕동채우미식당',
        value: '4741',
      },
      {
        displayValue: '서운동푸짐한밥상',
        value: '4740',
      },
      {
        displayValue: '중곡동(주)스푸니에프앤에스',
        value: '4739',
      },
      {
        displayValue: '시흥동한승푸드세종연구소점',
        value: '4738',
      },
      {
        displayValue: '가장동온정에프엔비피앤씨랩스점',
        value: '4737',
      },
      {
        displayValue: '용두동(주)더드림케이터링1',
        value: '4736',
      },
      {
        displayValue: '가장동온정에프엔비엔코스제2공장점',
        value: '4735',
      },
      {
        displayValue: '화성시네츄럴푸드다정요양원점',
        value: '4734',
      },
      {
        displayValue: '상대원동행운밥상',
        value: '4733',
      },
      {
        displayValue: '운서동어머니가차린밥상행사현장',
        value: '4732',
      },
      {
        displayValue: '평촌동명가한식뷔페',
        value: '4731',
      },
      {
        displayValue: '연다산동엄마손도시락',
        value: '4730',
      },
      {
        displayValue: '논현동맥주창고플러스',
        value: '4727',
      },
      {
        displayValue: '용인시만나웰빙한식뷔페',
        value: '4726',
      },
      {
        displayValue: '신사동맛있는집',
        value: '4725',
      },
      {
        displayValue: '이의동착한한식뷔페광교점',
        value: '4724',
      },
      {
        displayValue: '남촌동세민위탁급식소',
        value: '4723',
      },
      {
        displayValue: '신정동반찬나라1',
        value: '4722',
      },
      {
        displayValue: '김포시봉이네식당',
        value: '4721',
      },
      {
        displayValue: '화성시휴먼에코푸드프라이드시티점',
        value: '4720',
      },
      {
        displayValue: '평택시산정한식뷔페',
        value: '4719',
      },
      {
        displayValue: '마곡동시골밥상백반',
        value: '4718',
      },
      {
        displayValue: '화성시네츄럴푸드세종효요양원점',
        value: '4717',
      },
      {
        displayValue: '초이동명성노인주야간보호센터A',
        value: '4716',
      },
      {
        displayValue: '금정동한식뷔페자연애1',
        value: '4715',
      },
      {
        displayValue: '당정동시골식당',
        value: '4714',
      },
      {
        displayValue: '오금동급식연구소사랑하는교회점(돌봄)1',
        value: '4709',
      },
      {
        displayValue: '화성시이레푸드',
        value: '4708',
      },
      {
        displayValue: '방교동주식회사이브로',
        value: '4707',
      },
      {
        displayValue: '양평동베니스에프엔에스1',
        value: '4706',
      },
      {
        displayValue: '신촌동행복한식당',
        value: '4705',
      },
      {
        displayValue: '오류동공단중앙식당',
        value: '4704',
      },
      {
        displayValue: '삼성동맥주창고',
        value: '4703',
      },
      {
        displayValue: '화성시씨제이프레시웨이효동기계공업점',
        value: '4702',
      },
      {
        displayValue: '안양동다현한식뷔페',
        value: '4701',
      },
      {
        displayValue: '신길동미소한식뷔페',
        value: '4700',
      },
      {
        displayValue: '산곡동우리에프앤비축복의향기요양원점',
        value: '4699',
      },
      {
        displayValue: '화성시정든한식뷔페1',
        value: '4698',
      },
      {
        displayValue: '화성시뉴그린한식뷔페A',
        value: '4693',
      },
      {
        displayValue: '정왕동원푸드1',
        value: '4692',
      },
      {
        displayValue: '화성시엄마손한식부페선일솔루션지점',
        value: '4689',
      },
      {
        displayValue: '지제동민경집밥A',
        value: '4688',
      },
      {
        displayValue: '당정동푸름식당',
        value: '4685',
      },
      {
        displayValue: '당정동전주식당',
        value: '4684',
      },
      {
        displayValue: '양평동다올푸드',
        value: '4683',
      },
      {
        displayValue: '화성시이강김푸드',
        value: '4682',
      },
      {
        displayValue: '목내동자연밥상',
        value: '4681',
      },
      {
        displayValue: '성곡동베스트푸드케터링쿠팡안산2센터점A',
        value: '4680',
      },
      {
        displayValue: '성수동더반푸드',
        value: '4679',
      },
      {
        displayValue: '고잔동미가식당',
        value: '4678',
      },
      {
        displayValue: '마곡동장모님밥상한식뷔페',
        value: '4677',
      },
      {
        displayValue: '김포시태양식당',
        value: '4676',
      },
      {
        displayValue: '매산동행복한식뷔페',
        value: '4675',
      },
      {
        displayValue: '이의동두루본한식뷔페',
        value: '4674',
      },
      {
        displayValue: '고잔동남동식당1',
        value: '4673',
      },
      {
        displayValue: '원시동대성식당',
        value: '4672',
      },
      {
        displayValue: '김포시이모네집밥',
        value: '4653',
      },
      {
        displayValue: '서초동부정부페',
        value: '4652',
      },
      {
        displayValue: '당동군포온누리요양원1',
        value: '4651',
      },
      {
        displayValue: '성곡동행복한밥상A1',
        value: '4650',
      },
      {
        displayValue: '성곡동맛나식당',
        value: '4649',
      },
      {
        displayValue: '덕풍동오롯한상1',
        value: '4648',
      },
      {
        displayValue: '송도동온누리한식뷔페재능대학교점',
        value: '4647',
      },
      {
        displayValue: '평택시이쁜이네한식뷔페',
        value: '4646',
      },
      {
        displayValue: '배곧동네츄럴푸드꿈의요양원점',
        value: '4645',
      },
      {
        displayValue: '화성시네츄럴푸드오아시스요양원점',
        value: '4644',
      },
      {
        displayValue: '화성시오성한식부페',
        value: '4643',
      },
      {
        displayValue: '상대원동푸드스토리1',
        value: '4642',
      },
      {
        displayValue: '송정동소담한식부페',
        value: '4641',
      },
      {
        displayValue: '감이동시크릿푸드',
        value: '4640',
      },
      {
        displayValue: '가산동빅푸드',
        value: '4639',
      },
      {
        displayValue: '화성시정남한식뷔페',
        value: '4638',
      },
      {
        displayValue: '화성시영양밥상한식뷔페',
        value: '4626',
      },
      {
        displayValue: '평택시딜쿡퓨전한식',
        value: '4625',
      },
      {
        displayValue: '화성시스마트한식뷔페A',
        value: '4624',
      },
      {
        displayValue: '상대원동데일리푸드선텍점',
        value: '4623',
      },
      {
        displayValue: '양주시산수화회관',
        value: '4622',
      },
      {
        displayValue: '구월동큰집밥상',
        value: '4621',
      },
      {
        displayValue: '고잔동그린푸드위탁급식소',
        value: '4620',
      },
      {
        displayValue: '화성시늘솜한식뷔페A',
        value: '4619',
      },
      {
        displayValue: '화성시강남한식부페',
        value: '4618',
      },
      {
        displayValue: '정왕동원푸드',
        value: '4617',
      },
      {
        displayValue: '청천동새빛식당',
        value: '4616',
      },
      {
        displayValue: '정왕동한솔한식뷔페',
        value: '4615',
      },
      {
        displayValue: '고잔동신진산업위탁급식소',
        value: '4614',
      },
      {
        displayValue: '석우동더쉐프한식뷔페A',
        value: '4613',
      },
      {
        displayValue: '마곡동(주)본토푸드귀뚜라미연구소점',
        value: '4612',
      },
      {
        displayValue: '화성시우정읍행복한밥상',
        value: '4611',
      },
      {
        displayValue: '화성시이모네밥상',
        value: '4610',
      },
      {
        displayValue: '평택시유가네식당',
        value: '4609',
      },
      {
        displayValue: '휘경동푸드윈서울휘경여자중학교지점',
        value: '4608',
      },
      {
        displayValue: '화성시우정읍진수성찬',
        value: '4607',
      },
      {
        displayValue: '상대원동봉봉식당',
        value: '4606',
      },
      {
        displayValue: '부곡동깊은맛한식뷔페',
        value: '4604',
      },
      {
        displayValue: '방배동씨제이프레시웨이엠브레인점',
        value: '4603',
      },
      {
        displayValue: '화성시청미한식뷔페유니팩점',
        value: '4602',
      },
      {
        displayValue: '화성시청미한식뷔페',
        value: '4601',
      },
      {
        displayValue: '광주시원방가방가밥상2',
        value: '4600',
      },
      {
        displayValue: '정왕동명가식당',
        value: '4599',
      },
      {
        displayValue: '논현동삼보케미컬위탁급식소삼신금속점',
        value: '4598',
      },
      {
        displayValue: '화성시대흥한식뷔페A',
        value: '4597',
      },
      {
        displayValue: '논현동삼보케미컬위탁급식소',
        value: '4596',
      },
      {
        displayValue: '평택시만호한식뷔페',
        value: '4595',
      },
      {
        displayValue: '화성시한가네한식뷔페한국에프엠점1',
        value: '4594',
      },
      {
        displayValue: '구래동방가네한식당',
        value: '4593',
      },
      {
        displayValue: '초지동한승푸드',
        value: '4592',
      },
      {
        displayValue: '고잔동대흥매점식당A',
        value: '4591',
      },
      {
        displayValue: '평택시만나웰빙한식뷔페A',
        value: '4590',
      },
      {
        displayValue: '화성시해병대사령부',
        value: '4508',
      },
      {
        displayValue: '화성시맛사랑한식부페',
        value: '4504',
      },
      {
        displayValue: '자곡동율현초등학교',
        value: '4503',
      },
      {
        displayValue: '고잔동행복식당',
        value: '4502',
      },
      {
        displayValue: '정왕동맛고을1',
        value: '4501',
      },
      {
        displayValue: '평택시만나한식부페A',
        value: '4500',
      },
      {
        displayValue: '정왕동밥토랑',
        value: '4499',
      },
      {
        displayValue: '고잔동동현식당A',
        value: '4498',
      },
      {
        displayValue: '용답동진수성찬',
        value: '4497',
      },
      {
        displayValue: '화성시삼시세끼한식뷔페1',
        value: '4496',
      },
      {
        displayValue: '화성시장금이한식뷔페A',
        value: '4495',
      },
      {
        displayValue: '상대원동오늘의밥상센트럴점',
        value: '4494',
      },
      {
        displayValue: '화성시거성한식뷔페',
        value: '4493',
      },
      {
        displayValue: '송도동미래로한식당',
        value: '4492',
      },
      {
        displayValue: '화성시우정식당A',
        value: '4491',
      },
      {
        displayValue: '금정동한식당',
        value: '4477',
      },
      {
        displayValue: '오전동미르한식뷔페',
        value: '4476',
      },
      {
        displayValue: '광주시마루한식뷔페',
        value: '4475',
      },
      {
        displayValue: '연건동나이스캐터링서울대학교의과대점',
        value: '4474',
      },
      {
        displayValue: '동천동수담채실버스테이',
        value: '4473',
      },
      {
        displayValue: '화성시돈가스무한리필한식부페',
        value: '4472',
      },
      {
        displayValue: '파주시예스럼푸드',
        value: '4471',
      },
      {
        displayValue: '문봉동봄봄',
        value: '4470',
      },
      {
        displayValue: '화성시민지가족한식부페1',
        value: '4469',
      },
      {
        displayValue: '화성시미소식당',
        value: '4468',
      },
      {
        displayValue: '미산동본가한식부페',
        value: '4467',
      },
      {
        displayValue: '성곡동여흥식당',
        value: '4466',
      },
      {
        displayValue: '화성시신한한식뷔페',
        value: '4465',
      },
      {
        displayValue: '용인시원삼한식뷔페',
        value: '4464',
      },
      {
        displayValue: '화성시전주집밥',
        value: '4463',
      },
      {
        displayValue: '고잔동타워한식뷔페',
        value: '4462',
      },
      {
        displayValue: '화성시일등한식부페해병대사령부점',
        value: '4461',
      },
      {
        displayValue: '우만동푸드머스우만종합사회복지관지점',
        value: '4460',
      },
      {
        displayValue: '이천시해뜰밥집',
        value: '4459',
      },
      {
        displayValue: '화성시명가한식뷔페',
        value: '4440',
      },
      {
        displayValue: '화성시에프앤씨(F&C)푸드',
        value: '4439',
      },
      {
        displayValue: '김포시푸드스케치',
        value: '4438',
      },
      {
        displayValue: '화성시이가네식당',
        value: '4437',
      },
      {
        displayValue: '화성시우정한식부페',
        value: '4436',
      },
      {
        displayValue: '고잔동코멕스위탁급식소',
        value: '4435',
      },
      {
        displayValue: '문래동에이스한식셀프',
        value: '4434',
      },
      {
        displayValue: '역삼동아워홈엘박스점',
        value: '4433',
      },
      {
        displayValue: '송도동집밥정여사한식뷔페',
        value: '4432',
      },
      {
        displayValue: '송도동한식공간',
        value: '4431',
      },
      {
        displayValue: '장안동주식회사런치랩',
        value: '4430',
      },
      {
        displayValue: '역삼동광장818',
        value: '4429',
      },
      {
        displayValue: '용인시푸짐한밥상',
        value: '4428',
      },
      {
        displayValue: '고잔동화인써키트위탁급식소',
        value: '4427',
      },
      {
        displayValue: '성곡동생수구내식당',
        value: '4426',
      },
      {
        displayValue: '안양동미소셀프식당',
        value: '4425',
      },
      {
        displayValue: '고잔동안스급식소',
        value: '4419',
      },
      {
        displayValue: '고잔동지디케이화장품위탁급식소',
        value: '4418',
      },
      {
        displayValue: '간석동기운찬집밥',
        value: '4417',
      },
      {
        displayValue: '김포시더채움더힐실버케어요양원',
        value: '4416',
      },
      {
        displayValue: '김포시더채움김포그레이스요양원',
        value: '4415',
      },
      {
        displayValue: '김포시더채움메밀꽃요양원',
        value: '4414',
      },
      {
        displayValue: '삼정동부흥한식중식부페',
        value: '4413',
      },
      {
        displayValue: '평택시한미연합사',
        value: '4412',
      },
      {
        displayValue: '관철동아틀리에송',
        value: '4411',
      },
      {
        displayValue: '오정동명성푸드',
        value: '4410',
      },
      {
        displayValue: '정왕동구내식당맛나',
        value: '4409',
      },
      {
        displayValue: '논현동(주)푸디스엘엔에프논현점A',
        value: '4408',
      },
      {
        displayValue: '성곡동행복한밥상B',
        value: '4407',
      },
      {
        displayValue: '청천동대일식당',
        value: '4406',
      },
      {
        displayValue: '갈현동쿠킹트리한식뷔페',
        value: '4405',
      },
      {
        displayValue: '원미동더드림포차식당1',
        value: '4404',
      },
      {
        displayValue: '반월동가족같은밥상',
        value: '4403',
      },
      {
        displayValue: '남촌동코아아띠즈위탁급식소',
        value: '4402',
      },
      {
        displayValue: '장지동(주)엄마손출장뷔페장지공영차고지점',
        value: '4401',
      },
      {
        displayValue: '평택시만나웰빙한식뷔페',
        value: '4400',
      },
      {
        displayValue: '원천동상록한식뷔페1',
        value: '4399',
      },
      {
        displayValue: '서천동한식뷔폐칠성',
        value: '4398',
      },
      {
        displayValue: '화성시시골한식뷔페',
        value: '4397',
      },
      {
        displayValue: '화성시장금이한식뷔페문학리점A',
        value: '4396',
      },
      {
        displayValue: '화성시남양읍진수성찬한식부페',
        value: '4395',
      },
      {
        displayValue: '화성시소담골',
        value: '4394',
      },
      {
        displayValue: '가장동고향한식뷔페',
        value: '4393',
      },
      {
        displayValue: '화성시정든한식뷔페',
        value: '4392',
      },
      {
        displayValue: '의정부동참좋은푸드A',
        value: '4391',
      },
      {
        displayValue: '고잔동동화정공위탁급식소A',
        value: '4389',
      },
      {
        displayValue: '가산동태세라한식A',
        value: '4388',
      },
      {
        displayValue: '남촌동우성철강레이저위탁급식소',
        value: '4387',
      },
      {
        displayValue: '광주시시골밥상',
        value: '4386',
      },
      {
        displayValue: '화성시수라상',
        value: '4385',
      },
      {
        displayValue: '남촌동부흥구내식당',
        value: '4384',
      },
      {
        displayValue: '화성시청담한식뷔페B',
        value: '4383',
      },
      {
        displayValue: '매탄동더힘찬노인복지센터',
        value: '4381',
      },
      {
        displayValue: '광주시별한식뷔페',
        value: '4380',
      },
      {
        displayValue: '일신동대림식당',
        value: '4356',
      },
      {
        displayValue: '금정동한림이푸드1',
        value: '4355',
      },
      {
        displayValue: '석남동맛나한식부페',
        value: '4354',
      },
      {
        displayValue: '당정동봄날한식뷔페',
        value: '4353',
      },
      {
        displayValue: '석우동더쉐프한식뷔페',
        value: '4352',
      },
      {
        displayValue: '연남동주식회사드림잇',
        value: '4351',
      },
      {
        displayValue: '호계동갑순이셀프푸드',
        value: '4350',
      },
      {
        displayValue: '양주시발해1',
        value: '4349',
      },
      {
        displayValue: '청천동메가푸드1',
        value: '4348',
      },
      {
        displayValue: '상대원동늘봄밥상마이셰프점',
        value: '4347',
      },
      {
        displayValue: '화성시미소한식뷔페동일씨엔이점',
        value: '4346',
      },
      {
        displayValue: '화성시미소한식뷔페대현에스티점',
        value: '4345',
      },
      {
        displayValue: '화성시미소한식뷔페본점',
        value: '4344',
      },
      {
        displayValue: '청천동혜성식당',
        value: '4343',
      },
      {
        displayValue: '장당동다우리한식뷔페2호점',
        value: '4342',
      },
      {
        displayValue: '남촌동이에스코스메틱위탁급식소1',
        value: '4341',
      },
      {
        displayValue: '화성시정성을담은한식뷔페',
        value: '4340',
      },
      {
        displayValue: '양재동현대그린푸드현대자동차본사점',
        value: '4339',
      },
      {
        displayValue: '화성시민지가족한식부페',
        value: '4338',
      },
      {
        displayValue: '오류동더쿠킹스토리',
        value: '4337',
      },
      {
        displayValue: '논현동예손식당',
        value: '4336',
      },
      {
        displayValue: '목동옥토골한식뷔페',
        value: '4335',
      },
      {
        displayValue: '원창동수정식당',
        value: '4334',
      },
      {
        displayValue: '정왕동밥사랑식당',
        value: '4319',
      },
      {
        displayValue: '가좌동미가한식뷔페',
        value: '4318',
      },
      {
        displayValue: '김포시맛깔난한식뷔페',
        value: '4317',
      },
      {
        displayValue: '화성시만상',
        value: '4316',
      },
      {
        displayValue: '화성시더맛한식뷔페1',
        value: '4315',
      },
      {
        displayValue: '춘궁동대첩',
        value: '4314',
      },
      {
        displayValue: '화성시맛자랑한식부페',
        value: '4313',
      },
      {
        displayValue: '화성시행운한식부페',
        value: '4312',
      },
      {
        displayValue: '마곡동소담한식뷔페A',
        value: '4311',
      },
      {
        displayValue: '안성시명가한식뷔페',
        value: '4310',
      },
      {
        displayValue: '고잔동명성한식부페',
        value: '4309',
      },
      {
        displayValue: '화성시뉴그린한식뷔페',
        value: '4308',
      },
      {
        displayValue: '일원동대모초등학교',
        value: '4307',
      },
      {
        displayValue: '청주시지씨에스충방전동지점',
        value: '4306',
      },
      {
        displayValue: '평택시알찬한식뷔페1',
        value: '4305',
      },
      {
        displayValue: '화성시행복한밥상B',
        value: '4304',
      },
      {
        displayValue: '화성시시골밥상',
        value: '4303',
      },
      {
        displayValue: '당하동야무진한식부페1',
        value: '4286',
      },
      {
        displayValue: '논현동(주)푸디스엘엔에프논현점',
        value: '4285',
      },
      {
        displayValue: '궐동여주웰빙한식뷔페',
        value: '4284',
      },
      {
        displayValue: '청천동명가식당1',
        value: '4283',
      },
      {
        displayValue: '상대원동늘봄밥상mychef점',
        value: '4282',
      },
      {
        displayValue: '문원동국희네식당공사현장',
        value: '4281',
      },
      {
        displayValue: '중산동썬한식뷔페',
        value: '4280',
      },
      {
        displayValue: '하계동중평중학교',
        value: '4279',
      },
      {
        displayValue: '정왕동두리식당',
        value: '4278',
      },
      {
        displayValue: '기산동그린푸드1',
        value: '4277',
      },
      {
        displayValue: '안양동위대한밥상3호점',
        value: '4276',
      },
      {
        displayValue: '상대원동둘둘왕솥뚜껑',
        value: '4275',
      },
      {
        displayValue: '평동착한밥상',
        value: '4274',
      },
      {
        displayValue: '장지동문현고등학교',
        value: '4273',
      },
      {
        displayValue: '구의동동서울한식뷔페',
        value: '4265',
      },
      {
        displayValue: '이의동명가한식뷔페',
        value: '4264',
      },
      {
        displayValue: '화성시더드림한식뷔페',
        value: '4263',
      },
      {
        displayValue: '운서동인천공항정비소',
        value: '4262',
      },
      {
        displayValue: '구미동주박사',
        value: '4261',
      },
      {
        displayValue: '고잔동천리마식당A',
        value: '4260',
      },
      {
        displayValue: '고잔동대안스틸주식회사위탁급식소',
        value: '4259',
      },
      {
        displayValue: '삼정동엄마손한식뷔페',
        value: '4251',
      },
      {
        displayValue: '성곡동다담한식뷔페',
        value: '4250',
      },
      {
        displayValue: '성곡동미소밥상',
        value: '4249',
      },
      {
        displayValue: '일원동세종에프앤에스중산고등학교점',
        value: '4247',
      },
      {
        displayValue: '망월동오프더키친미사의정원점',
        value: '4241',
      },
      {
        displayValue: '김포시귀전리착한밥상',
        value: '4240',
      },
      {
        displayValue: '화성시향남읍더쉐프한식뷔페구내식당',
        value: '4239',
      },
      {
        displayValue: '화성시한식뷔페영의정',
        value: '4238',
      },
      {
        displayValue: '여주시트럭한식부페',
        value: '4237',
      },
      {
        displayValue: '성곡동제이에스푸드삼우이테크점',
        value: '4236',
      },
      {
        displayValue: '반포본동세화여자고등학교(중식)',
        value: '4235',
      },
      {
        displayValue: '휘경동(주)온더푸드휘경여자고등학교점',
        value: '4234',
      },
      {
        displayValue: '구미동서리담은25',
        value: '4233',
      },
      {
        displayValue: '광장동광남중학교',
        value: '4232',
      },
      {
        displayValue: '김포시아베끄뚜아착한뷔페',
        value: '4225',
      },
      {
        displayValue: '능동웨알유1',
        value: '4224',
      },
      {
        displayValue: '광주시무지개식당',
        value: '4223',
      },
      {
        displayValue: '미산동뜨락',
        value: '4222',
      },
      {
        displayValue: '안양동주식회사하이큐시스템1',
        value: '4221',
      },
      {
        displayValue: '당정동예향한식부페3',
        value: '4219',
      },
      {
        displayValue: '서교동쿡카이브',
        value: '4218',
      },
      {
        displayValue: '오전동휴먼에코푸드센트라인데시앙점A',
        value: '4213',
      },
      {
        displayValue: '고덕동휴먼에코푸드GS자이센트로A',
        value: '4212',
      },
      {
        displayValue: '신동휴먼에코푸드태영A',
        value: '4211',
      },
      {
        displayValue: '장지동휴먼에코푸드GS동탄A',
        value: '4210',
      },
      {
        displayValue: '화성시휴먼에코푸드봉담점A',
        value: '4209',
      },
      {
        displayValue: '화성시휴먼에코푸드본점',
        value: '4208',
      },
      {
        displayValue: '호원동행복한부페신한대학교점',
        value: '4207',
      },
      {
        displayValue: '초이동명성노인주야간보호센터',
        value: '4206',
      },
      {
        displayValue: '이천시남이천가정식부페',
        value: '4205',
      },
      {
        displayValue: '호원동행복한부페',
        value: '4204',
      },
      {
        displayValue: '고덕동만월',
        value: '4203',
      },
      {
        displayValue: '공덕동그집밥',
        value: '4202',
      },
      {
        displayValue: '사리현동사색찬미한정식일산순복음영산교회점',
        value: '4201',
      },
      {
        displayValue: '시천동씨앤비베이커리카페',
        value: '4200',
      },
      {
        displayValue: '고잔동일광메탈포밍위탁급식소',
        value: '4199',
      },
      {
        displayValue: '수표동형제네',
        value: '4198',
      },
      {
        displayValue: '서초동마마푸드',
        value: '4197',
      },
      {
        displayValue: '원창동우리밥집',
        value: '4196',
      },
      {
        displayValue: '초지동원미식당',
        value: '4195',
      },
      {
        displayValue: '도림동네츄럴푸드드림팰리스요양원점',
        value: '4194',
      },
      {
        displayValue: '양주시소연한식뷔페',
        value: '4193',
      },
      {
        displayValue: '논현동논현1647',
        value: '4192',
      },
      {
        displayValue: '구의동열린밥상',
        value: '4191',
      },
      {
        displayValue: '송도동현푸드브릴스점',
        value: '4190',
      },
      {
        displayValue: '송도동현푸드코넷시스점',
        value: '4189',
      },
      {
        displayValue: '정왕동동해식당',
        value: '4188',
      },
      {
        displayValue: '김포시대영가정식백반',
        value: '4187',
      },
      {
        displayValue: '양주시본푸드꽃밭에서요양원점',
        value: '4157',
      },
      {
        displayValue: '양주시본푸드사랑사랑요양원점',
        value: '4156',
      },
      {
        displayValue: '양주시본푸드온누리요양원점',
        value: '4155',
      },
      {
        displayValue: '양주시본푸드이레실버케어점',
        value: '4154',
      },
      {
        displayValue: '양주시본푸드송추푸른요양원점',
        value: '4153',
      },
      {
        displayValue: '지행동본푸드본점',
        value: '4152',
      },
      {
        displayValue: '화성시행복한밥집',
        value: '4151',
      },
      {
        displayValue: '안현동안현셀프식당',
        value: '4150',
      },
      {
        displayValue: '광사동우리에프앤비핀란드의숲요양원점',
        value: '4149',
      },
      {
        displayValue: '광주시이레밥상',
        value: '4148',
      },
      {
        displayValue: '안성시칠곡명가밥상',
        value: '4147',
      },
      {
        displayValue: '영천동이셰프한식뷔페',
        value: '4146',
      },
      {
        displayValue: '방배동호산나식당',
        value: '4145',
      },
      {
        displayValue: '평택시(주)보경푸드',
        value: '4144',
      },
      {
        displayValue: '개포동개현초등학교',
        value: '4143',
      },
      {
        displayValue: '개포동개원초등학교',
        value: '4142',
      },
      {
        displayValue: '청파동선린인터넷고등학교1',
        value: '4141',
      },
      {
        displayValue: '양재동킴스치킨포차',
        value: '2063',
      },
      {
        displayValue: '오류동베스트푸드케터링인천4FC점',
        value: '2062',
      },
      {
        displayValue: '정왕동현대식당1',
        value: '2061',
      },
      {
        displayValue: '풍덕천동케이에스푸드',
        value: '2060',
      },
      {
        displayValue: '도곡동언주초등학교',
        value: '2059',
      },
      {
        displayValue: '개포동국립국악고등학교',
        value: '2058',
      },
      {
        displayValue: '성곡동손맛한식뷔페',
        value: '2057',
      },
      {
        displayValue: '관양동씨제이프레시웨이RFHIC안양사옥점',
        value: '2056',
      },
      {
        displayValue: '문원동씨제이프레시웨이RFHIC과천사옥점',
        value: '2055',
      },
      {
        displayValue: '정왕동사랑부페식당',
        value: '2054',
      },
      {
        displayValue: '화성시화성한식뷔페',
        value: '2053',
      },
      {
        displayValue: '도당동호남한식부페1',
        value: '2052',
      },
      {
        displayValue: '화성시가온한식뷔페A',
        value: '2051',
      },
      {
        displayValue: '신림동남강고등학교1',
        value: '2050',
      },
      {
        displayValue: '방배동서문여자고등학교',
        value: '2049',
      },
      {
        displayValue: '화성시청담한식부페A',
        value: '2048',
      },
      {
        displayValue: '고잔동동현식당',
        value: '1270',
      },
      {
        displayValue: '이의동당동푸드윈3수원외국어고등학교지점',
        value: '1269',
      },
      {
        displayValue: '반송동당동푸드윈3반석초등학교지점',
        value: '1268',
      },
      {
        displayValue: '휘경동당동푸드윈3휘경여자중학교지점',
        value: '1267',
      },
      {
        displayValue: '감일동당동푸드윈3신우초등학교지점',
        value: '1266',
      },
      {
        displayValue: '광장동당동푸드윈3양진초등학교지점',
        value: '1265',
      },
      {
        displayValue: '대흥동당동푸드윈3숭문고등학교지점',
        value: '1264',
      },
      {
        displayValue: '미아동당동푸드윈3영훈고등학교지점',
        value: '1263',
      },
      {
        displayValue: '등촌동당동푸드윈3경복여자고등학교지점',
        value: '1262',
      },
      {
        displayValue: '상지석동동경이네한술밥상',
        value: '1261',
      },
      {
        displayValue: '화성시에이케이푸드빌대주이엔티',
        value: '1260',
      },
      {
        displayValue: '도화동재인식당',
        value: '1259',
      },
      {
        displayValue: '오류동월매한식뷔페',
        value: '1258',
      },
      {
        displayValue: '성내동오구오구',
        value: '1257',
      },
      {
        displayValue: '이의동경기도의회1',
        value: '1256',
      },
      {
        displayValue: '원천동상록한식뷔페',
        value: '1255',
      },
      {
        displayValue: '정왕동행복한식당',
        value: '1254',
      },
      {
        displayValue: '김포시남이해준밥집',
        value: '1253',
      },
      {
        displayValue: '농서동다온푸드',
        value: '1252',
      },
      {
        displayValue: '회기동경희고등학교1',
        value: '1251',
      },
      {
        displayValue: '성곡동행복한밥상A',
        value: '1250',
      },
      {
        displayValue: '당정동박셰프',
        value: '1249',
      },
      {
        displayValue: '평택시한국관광고등학교1',
        value: '1248',
      },
      {
        displayValue: '대조동한식뷔페',
        value: '1247',
      },
      {
        displayValue: '사노동디엔비푸드1',
        value: '1246',
      },
      {
        displayValue: '남양주시밥지기',
        value: '1245',
      },
      {
        displayValue: '성수동윤식당',
        value: '1244',
      },
      {
        displayValue: '고잔동두레식당',
        value: '1243',
      },
      {
        displayValue: '성곡동케이식당',
        value: '1242',
      },
      {
        displayValue: '성곡동삼위식당',
        value: '1241',
      },
      {
        displayValue: '김포시코리아',
        value: '1240',
      },
      {
        displayValue: '고잔동한솥밥',
        value: '1239',
      },
      {
        displayValue: '성곡동행복식당',
        value: '1238',
      },
      {
        displayValue: '평택시부뚜막한식부페',
        value: '1237',
      },
      {
        displayValue: '화성시더쉐프한식뷔페구내식당1',
        value: '1236',
      },
      {
        displayValue: '성수동뽀식이네',
        value: '1235',
      },
      {
        displayValue: '장항동고향식당',
        value: '1234',
      },
      {
        displayValue: '고잔동주)명진씨에스(행복식당)',
        value: '1233',
      },
      {
        displayValue: '화성시가본한식뷔페',
        value: '1232',
      },
      {
        displayValue: '능평동나이스캐터링니코메디칼점',
        value: '1231',
      },
      {
        displayValue: '덕정동우리에프앤비효드림노인복지센터점',
        value: '1230',
      },
      {
        displayValue: '논현동GIA어학원별관',
        value: '1229',
      },
      {
        displayValue: '정왕동우리집밥상',
        value: '1228',
      },
      {
        displayValue: '화성시은성식당',
        value: '1227',
      },
      {
        displayValue: '고덕동다우리한식뷔페숯불닭갈비점',
        value: '1226',
      },
      {
        displayValue: '안양동산들푸드연성대점1',
        value: '1225',
      },
      {
        displayValue: '춘궁동푸짐한푸드',
        value: '1224',
      },
      {
        displayValue: '망월동봄봄하남미사점',
        value: '1223',
      },
      {
        displayValue: '이천시해남한식뷔페A',
        value: '1222',
      },
      {
        displayValue: '화전동국희네식당',
        value: '1221',
      },
      {
        displayValue: '용인시웰컴플레이팅쿠팡양지5센터',
        value: '1220',
      },
      {
        displayValue: '방교동매일밥상',
        value: '1219',
      },
      {
        displayValue: '이천시남이천가정식뷔페',
        value: '1218',
      },
      {
        displayValue: '대치동씨제이프레시웨이시대인재신관점1',
        value: '1217',
      },
      {
        displayValue: '목동씨제이프레시웨이시대인재목동관점(8층)1',
        value: '1216',
      },
      {
        displayValue: '목동씨제이프레시웨이시대인재목동관점(7층)1',
        value: '1215',
      },
      {
        displayValue: '평택시동문한식뷔페1호점',
        value: '1214',
      },
      {
        displayValue: '김포시행운밥상행복국수',
        value: '1213',
      },
      {
        displayValue: '신흥동엄마손푸드1',
        value: '1212',
      },
      {
        displayValue: '신정동반찬나라',
        value: '1211',
      },
      {
        displayValue: '논현동(주)푸디스엘엔에프아이디병원지점',
        value: '1210',
      },
      {
        displayValue: '삼성동도시락카페',
        value: '1209',
      },
      {
        displayValue: '광주시밥샵',
        value: '1208',
      },
      {
        displayValue: '고덕동오렌지식당',
        value: '1207',
      },
      {
        displayValue: '이의동다온한식부페',
        value: '1206',
      },
      {
        displayValue: '화성시서진한식뷔페',
        value: '1205',
      },
      {
        displayValue: '사동한식뷔페칠성',
        value: '1204',
      },
      {
        displayValue: '감정동찬마루',
        value: '1203',
      },
      {
        displayValue: '고덕동더킹한식뷔페2호점A',
        value: '1202',
      },
      {
        displayValue: '성곡동행복한밥상',
        value: '1201',
      },
      {
        displayValue: '화성시대가한식뷔페',
        value: '1200',
      },
      {
        displayValue: '영천동퍼스트푸드',
        value: '1199',
      },
      {
        displayValue: '덕은동수지푸드',
        value: '1198',
      },
      {
        displayValue: '성곡동일미식당A',
        value: '1197',
      },
      {
        displayValue: '화성시다드림2호점한식뷔페1',
        value: '1196',
      },
      {
        displayValue: '상대원동착한한식뷔페',
        value: '1195',
      },
      {
        displayValue: '용인시돼지삼촌네',
        value: '1194',
      },
      {
        displayValue: '마두동밥이보약A',
        value: '1193',
      },
      {
        displayValue: '김포시소담채',
        value: '1192',
      },
      {
        displayValue: '광주시원방가방가밥상1',
        value: '1191',
      },
      {
        displayValue: '정왕동(주)푸디스엘엔에프고이테크점',
        value: '1190',
      },
      {
        displayValue: '신길동쉼',
        value: '1189',
      },
      {
        displayValue: '문봉동보아스골든케어',
        value: '1188',
      },
      {
        displayValue: '용인시씨제이프레시웨이코코도르점',
        value: '1187',
      },
      {
        displayValue: '화성시은혜한식뷔페',
        value: '1186',
      },
      {
        displayValue: '금곡동송가네한식뷔페',
        value: '1185',
      },
      {
        displayValue: '화성시양감면행복한밥상',
        value: '1184',
      },
      {
        displayValue: '화성시웰스프레쉬에이치솔루션점',
        value: '1183',
      },
      {
        displayValue: '포천시행복식당A',
        value: '1182',
      },
      {
        displayValue: '화성시민지식당',
        value: '1181',
      },
      {
        displayValue: '논현동구뜰',
        value: '1180',
      },
      {
        displayValue: '평택시동문한식뷔페',
        value: '1179',
      },
      {
        displayValue: '김포시행운한식뷔페',
        value: '1178',
      },
      {
        displayValue: '농서동농서한식뷔페',
        value: '1177',
      },
      {
        displayValue: '화성시베스트푸드케터링코디화성공장1',
        value: '1176',
      },
      {
        displayValue: '가장동베스트푸드케터링1',
        value: '1175',
      },
      {
        displayValue: '고잔동서연탑메탈위탁급식소',
        value: '1174',
      },
      {
        displayValue: '남촌동이에스코스메틱위탁급식소',
        value: '1173',
      },
      {
        displayValue: '보라동베스트푸드케터링아신물류센터점',
        value: '1172',
      },
      {
        displayValue: '송동베스트푸드케터링동탄현장점1',
        value: '1171',
      },
      {
        displayValue: '가수동베스트푸드케터링세교현장점2',
        value: '1170',
      },
      {
        displayValue: '가수동베스트푸드케터링세교현장점1',
        value: '1169',
      },
      {
        displayValue: '정왕동해남식당',
        value: '1168',
      },
      {
        displayValue: '평택시알찬한식뷔페',
        value: '1167',
      },
      {
        displayValue: '오류동구립장애인직업재활시설1',
        value: '1166',
      },
      {
        displayValue: '광주시맛드림한정식',
        value: '1165',
      },
      {
        displayValue: '초지동제이푸드한식뷔페1',
        value: '1164',
      },
      {
        displayValue: '내동더큰나무',
        value: '1163',
      },
      {
        displayValue: '송도동(주)본토푸드엔알티점',
        value: '1162',
      },
      {
        displayValue: '화성시엄마손한식부페',
        value: '1161',
      },
      {
        displayValue: '삼정동선경한식부페',
        value: '1160',
      },
      {
        displayValue: '화성시남양읍행복한밥상',
        value: '1159',
      },
      {
        displayValue: '가산동가족식당',
        value: '1158',
      },
      {
        displayValue: '성산동마포중앙도서관구내식당',
        value: '1157',
      },
      {
        displayValue: '공세동씨제이프레시웨이한국알콜산업점',
        value: '1156',
      },
      {
        displayValue: '고잔동대흥매점식당',
        value: '1155',
      },
      {
        displayValue: '성곡동집밥정여사한식뷔페1',
        value: '1154',
      },
      {
        displayValue: '당정동집밥셀프식당',
        value: '1153',
      },
      {
        displayValue: '역삼동하이푸드하이퍼학원의대관점',
        value: '1152',
      },
      {
        displayValue: '역삼동하이푸드하이퍼학원점',
        value: '1151',
      },
      {
        displayValue: '다산동마더앤찬큐이엠학원점',
        value: '1150',
      },
      {
        displayValue: '남촌동엘디아구내식당',
        value: '1149',
      },
      {
        displayValue: '반포동이에에치푸드래미안점',
        value: '1148',
      },
      {
        displayValue: '원창동베스트푸드케터링인천22FC점',
        value: '1147',
      },
      {
        displayValue: '천천동이에이치푸드성균관대학교점',
        value: '1146',
      },
      {
        displayValue: '반월동이에이치푸드반월동점',
        value: '1145',
      },
      {
        displayValue: '평택시양평한식뷔페',
        value: '1144',
      },
      {
        displayValue: '경서동호남식당',
        value: '1143',
      },
      {
        displayValue: '내동미감한식부페',
        value: '1142',
      },
      {
        displayValue: '삼동전라도밥상한식뷔페A',
        value: '1141',
      },
      {
        displayValue: '주엽동(주)연두애일산청솔학원점',
        value: '1140',
      },
      {
        displayValue: '화성시해나밥집A',
        value: '1139',
      },
      {
        displayValue: '호계동메가푸드평촌점',
        value: '1138',
      },
      {
        displayValue: '이매동메가푸드분당점',
        value: '1137',
      },
      {
        displayValue: '서초동메가푸드서초점',
        value: '1136',
      },
      {
        displayValue: '소하동메가푸드광명점1',
        value: '1135',
      },
      {
        displayValue: '고덕동더킹한식뷔페2호점',
        value: '1134',
      },
      {
        displayValue: '화성시한가네한식뷔페한국에프엠점',
        value: '1133',
      },
      {
        displayValue: '가좌동서연구내식당',
        value: '1132',
      },
      {
        displayValue: '남양주시해뜰날',
        value: '1131',
      },
      {
        displayValue: '남양주시삼시세끼',
        value: '1130',
      },
      {
        displayValue: '신장동일류푸드',
        value: '1129',
      },
      {
        displayValue: '서초동쿡카이브',
        value: '1128',
      },
      {
        displayValue: '오전동휴먼에코푸드센트라인데시앙점',
        value: '1127',
      },
      {
        displayValue: '신동서울식당',
        value: '1126',
      },
      {
        displayValue: '당동군포온누리요양원',
        value: '1125',
      },
      {
        displayValue: '상야동(주)더베스트유원1',
        value: '1124',
      },
      {
        displayValue: '금오동우리에프앤비위너스요양원점',
        value: '1123',
      },
      {
        displayValue: '양주시우리에프앤비해바라기요양원점',
        value: '1122',
      },
      {
        displayValue: '양주시우리에프앤비해오름요양원점',
        value: '1121',
      },
      {
        displayValue: '광사동우리에프앤비늘사랑요양원점',
        value: '1120',
      },
      {
        displayValue: '양주시우리에프앤비광적요양원점',
        value: '1119',
      },
      {
        displayValue: '남방동우리에프앤비성신요양원점',
        value: '1118',
      },
      {
        displayValue: '원창동전주식당',
        value: '1117',
      },
      {
        displayValue: '천호동도시락yea!1',
        value: '1116',
      },
      {
        displayValue: '성수동알러뷰한식뷔페',
        value: '1115',
      },
      {
        displayValue: '망월동주식회사위니드',
        value: '1114',
      },
      {
        displayValue: '언남동행복한맛집',
        value: '1113',
      },
      {
        displayValue: '평택시드림푸드A',
        value: '1112',
      },
      {
        displayValue: '용인시본가구첩반상',
        value: '1111',
      },
      {
        displayValue: '화성시진수성찬한식뷔페A',
        value: '1110',
      },
      {
        displayValue: '정왕동원미식당',
        value: '1109',
      },
      {
        displayValue: '가좌동자연밥상1',
        value: '1108',
      },
      {
        displayValue: '기산동그린푸드',
        value: '1107',
      },
      {
        displayValue: '김포시손가네웰빙한식뷔페',
        value: '1106',
      },
      {
        displayValue: '용인시예담푸드',
        value: '1105',
      },
      {
        displayValue: '화성시맛드림',
        value: '1104',
      },
      {
        displayValue: '성수동원푸드코리아',
        value: '1103',
      },
      {
        displayValue: '김포시오리목',
        value: '1102',
      },
      {
        displayValue: '용인시(주)본토푸드테스성도이엔지점',
        value: '1101',
      },
      {
        displayValue: '옥정동돈아돈아한식뷔페1호점',
        value: '1100',
      },
      {
        displayValue: '옥정동돈아돈아한식뷔페2호점',
        value: '1099',
      },
      {
        displayValue: '용두동(주)더드림케이터링',
        value: '1098',
      },
      {
        displayValue: '잠원동마미식당',
        value: '1097',
      },
      {
        displayValue: '파주시삼시세끼',
        value: '1096',
      },
      {
        displayValue: '가산동다온누리푸드',
        value: '1095',
      },
      {
        displayValue: '성곡동전주식당',
        value: '1094',
      },
      {
        displayValue: '포천시(주)그린푸드',
        value: '1093',
      },
      {
        displayValue: '김포시해피한식뷔페',
        value: '1092',
      },
      {
        displayValue: '도당동태양정',
        value: '1091',
      },
      {
        displayValue: '항동(주)푸르웰쿠팡17센터',
        value: '1090',
      },
      {
        displayValue: '화성시투더리삼겹살한식뷔페',
        value: '1089',
      },
      {
        displayValue: '덕풍동주식회사리쉐프도시락',
        value: '1088',
      },
      {
        displayValue: '반포동주식회사포유반포지점',
        value: '1087',
      },
      {
        displayValue: '화성시늘찬한식뷔페A',
        value: '1086',
      },
      {
        displayValue: '당동푸드윈_군포1',
        value: '1085',
      },
      {
        displayValue: '정왕동행복맘',
        value: '1084',
      },
      {
        displayValue: '계산동해서초등학교',
        value: '1083',
      },
      {
        displayValue: '석남동명가식당1',
        value: '1082',
      },
      {
        displayValue: '평택시전주집밥',
        value: '1081',
      },
      {
        displayValue: '평택시맛뜰한식뷔페',
        value: '1080',
      },
      {
        displayValue: '태장동더드림에프앤에스',
        value: '1079',
      },
      {
        displayValue: '모곡동원푸드시스템AMK점',
        value: '1078',
      },
      {
        displayValue: '고색동왕의밥상A',
        value: '1077',
      },
      {
        displayValue: '원창동원창식당',
        value: '1076',
      },
      {
        displayValue: '소하동(주)백담원',
        value: '1075',
      },
      {
        displayValue: '석남동정원뷔페식당',
        value: '1074',
      },
      {
        displayValue: '원창동선푸드한일시멘트인천공장점',
        value: '1073',
      },
      {
        displayValue: '고잔동금성산업위탁급식소',
        value: '1072',
      },
      {
        displayValue: '서현동서현도서관',
        value: '1071',
      },
      {
        displayValue: '화성시수담푸드귀래점',
        value: '1070',
      },
      {
        displayValue: '오정동한끼식당',
        value: '1069',
      },
      {
        displayValue: '덕계동우리에프앤비해와달요양원점',
        value: '1068',
      },
      {
        displayValue: '평택시솔나무',
        value: '1067',
      },
      {
        displayValue: '을왕동어머니가차린밥상1',
        value: '1066',
      },
      {
        displayValue: '송도동하나한식뷔페',
        value: '1065',
      },
      {
        displayValue: '삼정동태양정(주)태익지점',
        value: '1064',
      },
      {
        displayValue: '가좌동시골동네',
        value: '1063',
      },
      {
        displayValue: '화성시늘찬한식뷔페',
        value: '1062',
      },
      {
        displayValue: '지산동전주한식뷔페지산점',
        value: '1061',
      },
      {
        displayValue: '화성시엄마손한식뷔페',
        value: '1060',
      },
      {
        displayValue: '청라동황금한식뷔페',
        value: '1059',
      },
      {
        displayValue: '용인시좋은나무한식뷔페',
        value: '1058',
      },
      {
        displayValue: '김포시더찬한식',
        value: '1057',
      },
      {
        displayValue: '운서동세인티앤엘구내식당',
        value: '1056',
      },
      {
        displayValue: '화성시덕우식당',
        value: '1055',
      },
      {
        displayValue: '평택시세종식당',
        value: '1054',
      },
      {
        displayValue: '외삼미동아가페요양원',
        value: '1053',
      },
      {
        displayValue: '고잔동남동식당',
        value: '1052',
      },
      {
        displayValue: '정왕동맛있는밥상',
        value: '1051',
      },
      {
        displayValue: '운서동씨제이프레시웨이도앤코코리아점',
        value: '1050',
      },
      {
        displayValue: '학익동(주)본토푸드시티오씨엘점',
        value: '1049',
      },
      {
        displayValue: '화성시사계절한식뷔페(팔탄)1',
        value: '1048',
      },
      {
        displayValue: '내동다우테크한식푸드1',
        value: '1047',
      },
      {
        displayValue: '포천시행복식당',
        value: '1046',
      },
      {
        displayValue: '남촌동대일위탁급식소',
        value: '1045',
      },
      {
        displayValue: '고잔동대홍한식뷔페',
        value: '1044',
      },
      {
        displayValue: '농서동이에이치푸드지하',
        value: '1043',
      },
      {
        displayValue: '백석동유니813한식부페',
        value: '1042',
      },
      {
        displayValue: '김포시한방생삼겹살',
        value: '1041',
      },
      {
        displayValue: '목내동영동집밥',
        value: '1040',
      },
      {
        displayValue: '신촌동기분좋은밥집',
        value: '1039',
      },
      {
        displayValue: '가산동행복한한식뷔페A',
        value: '1038',
      },
      {
        displayValue: '풍무동맛드림',
        value: '1037',
      },
      {
        displayValue: '청천동한샘푸드',
        value: '1036',
      },
      {
        displayValue: '안성시남도한뷔페cj물류센터나동',
        value: '1035',
      },
      {
        displayValue: '안성시남도한뷔페cj물류센터가동',
        value: '1034',
      },
      {
        displayValue: '정왕동소담한식뷔페',
        value: '1033',
      },
      {
        displayValue: '장지동소이찬',
        value: '1032',
      },
      {
        displayValue: '성곡동선진식당',
        value: '1031',
      },
      {
        displayValue: '매탄동매탄지역아동센터',
        value: '1030',
      },
      {
        displayValue: '정왕동현대식당',
        value: '1029',
      },
      {
        displayValue: '화성시우리식당',
        value: '1028',
      },
      {
        displayValue: '오류동베스트푸드케터링인천12FC점',
        value: '1027',
      },
      {
        displayValue: '평택시한국관광고등학교',
        value: '1026',
      },
      {
        displayValue: '매탄동힘찬노인복지센터',
        value: '1025',
      },
      {
        displayValue: '가좌동써키트식당',
        value: '1024',
      },
      {
        displayValue: '정왕동매화식당',
        value: '1023',
      },
      {
        displayValue: '화성시두레자연고등학교',
        value: '1022',
      },
      {
        displayValue: '정왕동집밥',
        value: '1021',
      },
      {
        displayValue: '안성시입장맛집한식뷔페',
        value: '1020',
      },
      {
        displayValue: '중곡동스푸니A',
        value: '1019',
      },
      {
        displayValue: '광주시원방가방가밥상',
        value: '1018',
      },
      {
        displayValue: '원천동테라푸드',
        value: '1017',
      },
      {
        displayValue: '고잔동일신기연구내식당',
        value: '1016',
      },
      {
        displayValue: '고잔동정송위탁급식소',
        value: '1015',
      },
      {
        displayValue: '화성시청담한식부페',
        value: '1014',
      },
      {
        displayValue: '화성시부자식당1',
        value: '1013',
      },
      {
        displayValue: '가산동아르센한식부페',
        value: '1012',
      },
      {
        displayValue: '남양주시시골밥상',
        value: '1011',
      },
      {
        displayValue: '원시동자연한식뷔페',
        value: '1010',
      },
      {
        displayValue: '화성시해나밥집',
        value: '1009',
      },
      {
        displayValue: '화성시우리셀프식당',
        value: '1008',
      },
      {
        displayValue: '평택시하나푸드',
        value: '1007',
      },
      {
        displayValue: '김포시건강한밥상A',
        value: '1006',
      },
      {
        displayValue: '용인시가족식당',
        value: '1005',
      },
      {
        displayValue: '석남동행복한식당',
        value: '1004',
      },
      {
        displayValue: '이천시쌍용한식부페',
        value: '1003',
      },
      {
        displayValue: '월송동대선정한식뷔페',
        value: '1002',
      },
      {
        displayValue: '화정동맛샘캐터링',
        value: '1001',
      },
      {
        displayValue: '평택시에이유21',
        value: '1000',
      },
      {
        displayValue: '가산동와이즈한식',
        value: '999',
      },
      {
        displayValue: '평택시호남한식뷔페A',
        value: '998',
      },
      {
        displayValue: '궐동진수성찬',
        value: '997',
      },
      {
        displayValue: '용인시청북식당',
        value: '996',
      },
      {
        displayValue: '용이동(주)베스트토탈서비스평택대학교',
        value: '995',
      },
      {
        displayValue: '신흥동국제창고구내식당',
        value: '994',
      },
      {
        displayValue: '세교동주식회사이에이치푸드',
        value: '993',
      },
      {
        displayValue: '도당동집밥에반하다',
        value: '992',
      },
      {
        displayValue: '원창동쭌이네한식뷔페',
        value: '991',
      },
      {
        displayValue: '고잔동동화정공위탁급식소',
        value: '990',
      },
      {
        displayValue: '고잔동천리마식당',
        value: '989',
      },
      {
        displayValue: '고덕동에이푸드삼성물산지점',
        value: '988',
      },
      {
        displayValue: '화성시정성한식부페',
        value: '987',
      },
      {
        displayValue: '여의도동푸짐한밥상',
        value: '986',
      },
      {
        displayValue: '신천동금강푸드잠실진주1',
        value: '985',
      },
      {
        displayValue: '도곡동소반애찬',
        value: '984',
      },
      {
        displayValue: '왕길동명성푸드',
        value: '983',
      },
      {
        displayValue: '용인시만나정2호점',
        value: '982',
      },
      {
        displayValue: '가정동별미가',
        value: '981',
      },
      {
        displayValue: '정왕동벤처로식당',
        value: '980',
      },
      {
        displayValue: '도화동송가네따밥',
        value: '979',
      },
      {
        displayValue: '원창동행복식당',
        value: '978',
      },
      {
        displayValue: '광주시우리식당',
        value: '977',
      },
      {
        displayValue: '화성시인생맛집한식뷔페',
        value: '976',
      },
      {
        displayValue: '화성시삼호푸드주식회사',
        value: '975',
      },
      {
        displayValue: '도내동대우한식',
        value: '974',
      },
      {
        displayValue: '방교동바로쿡한식뷔페',
        value: '973',
      },
      {
        displayValue: '관양동황금밥상',
        value: '972',
      },
      {
        displayValue: '북가좌동가재울고등학교',
        value: '971',
      },
      {
        displayValue: '정왕동따뜻한집밥',
        value: '970',
      },
      {
        displayValue: '문형동웰컴플레이팅쿠팡5센터점',
        value: '969',
      },
      {
        displayValue: '문형동웰컴플레이팅쿠팡3센터점',
        value: '968',
      },
      {
        displayValue: '화성시봉담푸드',
        value: '967',
      },
      {
        displayValue: '이충동송탄고등학교1',
        value: '966',
      },
      {
        displayValue: '평택시진수성찬A',
        value: '965',
      },
      {
        displayValue: '화성시별이네밥상',
        value: '964',
      },
      {
        displayValue: '용인시맛나한식부페SHL',
        value: '963',
      },
      {
        displayValue: '고잔동태양기업위탁급식소',
        value: '962',
      },
      {
        displayValue: '고잔동대영식당',
        value: '961',
      },
      {
        displayValue: '비전동스마일요양원',
        value: '960',
      },
      {
        displayValue: '용인시전주한식뷔페',
        value: '959',
      },
      {
        displayValue: '정왕동좋은식당',
        value: '958',
      },
      {
        displayValue: '지제동더킹한식뷔페',
        value: '957',
      },
      {
        displayValue: '가락동주식회사웰스프레쉬경찰병원점',
        value: '956',
      },
      {
        displayValue: '간석동그린셀프식당',
        value: '955',
      },
      {
        displayValue: '오류동남도푸드',
        value: '954',
      },
      {
        displayValue: '화성시한두레한식뷔페',
        value: '953',
      },
      {
        displayValue: '화성시성미식당1',
        value: '952',
      },
      {
        displayValue: '합정동한식생각',
        value: '951',
      },
      {
        displayValue: '구리시푸드포레',
        value: '950',
      },
      {
        displayValue: '여주시들밥집',
        value: '949',
      },
      {
        displayValue: '별내동집밥한식뷔페',
        value: '948',
      },
      {
        displayValue: '가산동집밥구내식당2',
        value: '947',
      },
      {
        displayValue: '평택시미술관',
        value: '946',
      },
      {
        displayValue: '미아동솔샘고등학교',
        value: '945',
      },
      {
        displayValue: '남촌동우진공업위탁급식소',
        value: '944',
      },
      {
        displayValue: '망우동송곡여자고등학교',
        value: '943',
      },
      {
        displayValue: '송도동온누리한식뷔페A',
        value: '942',
      },
      {
        displayValue: '관산동(주)사랑과선행고양점',
        value: '941',
      },
      {
        displayValue: '운서동은주네',
        value: '940',
      },
      {
        displayValue: '광주시나래네한식뷔페',
        value: '939',
      },
      {
        displayValue: '화성시태양맛집',
        value: '938',
      },
      {
        displayValue: '화성시정가네식당',
        value: '937',
      },
      {
        displayValue: '운서동씨제이프레쉬웨이인스파이어2호점',
        value: '936',
      },
      {
        displayValue: '마곡동서울항공비즈니스고등학교',
        value: '935',
      },
      {
        displayValue: '평택시현곡한식뷔페',
        value: '934',
      },
      {
        displayValue: '청라동대원식당',
        value: '933',
      },
      {
        displayValue: '옥정동우리에프앤비청춘재활노인복지센터점',
        value: '932',
      },
      {
        displayValue: '관양동청솔푸드',
        value: '931',
      },
      {
        displayValue: '금정동한식뷔페자연애',
        value: '930',
      },
      {
        displayValue: '당하동한마음식당',
        value: '929',
      },
      {
        displayValue: '화성시소담',
        value: '928',
      },
      {
        displayValue: '화성시알러뷰한식뷔페1',
        value: '927',
      },
      {
        displayValue: '세교동한식일번지',
        value: '926',
      },
      {
        displayValue: '신림동남강고등학교',
        value: '925',
      },
      {
        displayValue: '안양동산들푸드연성대점',
        value: '924',
      },
      {
        displayValue: '삼선동산들푸드한성대1호점',
        value: '923',
      },
      {
        displayValue: '파주시행복한한식부페',
        value: '922',
      },
      {
        displayValue: '가산동집밥구내식당1',
        value: '921',
      },
      {
        displayValue: '화성시퓨전한식부페',
        value: '920',
      },
      {
        displayValue: '김포시한식대국1',
        value: '919',
      },
      {
        displayValue: '화서동선화네한식뷔페',
        value: '918',
      },
      {
        displayValue: '고잔동행복한한식뷔페',
        value: '917',
      },
      {
        displayValue: '김포시골드스푼',
        value: '916',
      },
      {
        displayValue: '반포동주식회사포유',
        value: '915',
      },
      {
        displayValue: '의정부동베스트푸드',
        value: '914',
      },
      {
        displayValue: '고암동선진에프앤비1',
        value: '913',
      },
      {
        displayValue: '이천시주식회사디와이푸드랩',
        value: '912',
      },
      {
        displayValue: '고잔동대지식당',
        value: '911',
      },
      {
        displayValue: '송도동제철밥상송빛초등학교점',
        value: '910',
      },
      {
        displayValue: '청천동둘로스구내식당',
        value: '909',
      },
      {
        displayValue: '화성시행복한식부페A',
        value: '908',
      },
      {
        displayValue: '송도동신토불이신항물류센터점',
        value: '907',
      },
      {
        displayValue: '중동남도식당',
        value: '906',
      },
      {
        displayValue: '송도동신토불이대우점',
        value: '905',
      },
      {
        displayValue: '산본동웰빙한식푸드',
        value: '904',
      },
      {
        displayValue: '화성시스마트한식뷔페',
        value: '903',
      },
      {
        displayValue: '평택시장금이한식부페A',
        value: '902',
      },
      {
        displayValue: '금정동다인',
        value: '901',
      },
      {
        displayValue: '화성시부안낙지마당',
        value: '900',
      },
      {
        displayValue: '성곡동타크라구내식당',
        value: '899',
      },
      {
        displayValue: '김포시수지한식부페',
        value: '898',
      },
      {
        displayValue: '정왕동대승식당',
        value: '897',
      },
      {
        displayValue: '정왕동한일식당',
        value: '896',
      },
      {
        displayValue: '파주시사계절한식부페',
        value: '895',
      },
      {
        displayValue: '일직동파티수광명점',
        value: '894',
      },
      {
        displayValue: '대화동파티수일산점',
        value: '893',
      },
      {
        displayValue: '마곡동파티수강서마곡점',
        value: '892',
      },
      {
        displayValue: '항동파티수구로항동점',
        value: '891',
      },
      {
        displayValue: '상하동파티수용인기흥점',
        value: '890',
      },
      {
        displayValue: '풍산동파티수하남미사점',
        value: '889',
      },
      {
        displayValue: '영천동파티수동탄역점',
        value: '888',
      },
      {
        displayValue: '하동파티수수원광교점',
        value: '887',
      },
      {
        displayValue: '화성시석포리맛집A',
        value: '886',
      },
      {
        displayValue: '광주시정푸드',
        value: '885',
      },
      {
        displayValue: '덕풍동리쉐프',
        value: '884',
      },
      {
        displayValue: '화성시함지박한식부페',
        value: '883',
      },
      {
        displayValue: '안성시한식부페',
        value: '882',
      },
      {
        displayValue: '평택시황금밥상',
        value: '881',
      },
      {
        displayValue: '화성시와이푸드한식뷔페A',
        value: '880',
      },
      {
        displayValue: '미아동신일고등학교(석식)',
        value: '879',
      },
      {
        displayValue: '화성시행복한식뷔페',
        value: '878',
      },
      {
        displayValue: '남방동우리에프앤비',
        value: '877',
      },
      {
        displayValue: '남북동전라도한식부페',
        value: '876',
      },
      {
        displayValue: '김포시사랑나무한식부페',
        value: '875',
      },
      {
        displayValue: '고등동푸드윈국군의날(서울공항 석식)',
        value: '874',
      },
      {
        displayValue: '고등동푸드윈국군의날(서울공항 중식)',
        value: '873',
      },
      {
        displayValue: '고등동푸드윈국군의날(서울공항 조식)',
        value: '872',
      },
      {
        displayValue: '회기동경희고등학교',
        value: '871',
      },
      {
        displayValue: '김포시컬러푸드',
        value: '870',
      },
      {
        displayValue: '농서동제이에스캐더링주식회사',
        value: '869',
      },
      {
        displayValue: '내동만복한식뷔페',
        value: '868',
      },
      {
        displayValue: '관고동무지개식당',
        value: '867',
      },
      {
        displayValue: '가좌동백록식당',
        value: '866',
      },
      {
        displayValue: '이충동송탄고등학교',
        value: '865',
      },
      {
        displayValue: '내동다우테크한식푸드',
        value: '864',
      },
      {
        displayValue: '화성시알러뷰한식뷔페',
        value: '863',
      },
      {
        displayValue: '마곡동소담한식뷔페',
        value: '862',
      },
      {
        displayValue: '김포시남원집',
        value: '861',
      },
      {
        displayValue: '평택시화담푸드시스템',
        value: '860',
      },
      {
        displayValue: '목내동신광식당',
        value: '859',
      },
      {
        displayValue: '김포시대동화한식부페',
        value: '858',
      },
      {
        displayValue: '고잔동인테그랄퍼니처위탁급식소',
        value: '857',
      },
      {
        displayValue: '평택시한식웰빙부페',
        value: '856',
      },
      {
        displayValue: '이천시더드림푸드시스템',
        value: '855',
      },
      {
        displayValue: '역삼동(주)자연애에프엔티피씨에이코리아점',
        value: '854',
      },
      {
        displayValue: '당동푸드윈국군의날(숙영지)',
        value: '853',
      },
      {
        displayValue: '효성동하나식당',
        value: '852',
      },
      {
        displayValue: '망월동담아푸드',
        value: '851',
      },
      {
        displayValue: '고잔동진성캐스트위탁급식소',
        value: '850',
      },
      {
        displayValue: '광주시세진한식부페',
        value: '849',
      },
      {
        displayValue: '신흥동신안한식부페',
        value: '848',
      },
      {
        displayValue: '성곡동미소한식뷔페',
        value: '847',
      },
      {
        displayValue: '고색동지수푸드',
        value: '846',
      },
      {
        displayValue: '청천동오상사푸드',
        value: '845',
      },
      {
        displayValue: '십정동한샘한식부페1',
        value: '844',
      },
      {
        displayValue: '초지동제이푸드한식뷔페',
        value: '843',
      },
      {
        displayValue: '영천동주식회사웰스프레쉬경안고등학교점',
        value: '842',
      },
      {
        displayValue: '평택시VIP푸드',
        value: '841',
      },
      {
        displayValue: '성곡동전주구내식당',
        value: '840',
      },
      {
        displayValue: '고잔동동원화스너구내식당',
        value: '839',
      },
      {
        displayValue: '정왕동보성식당',
        value: '838',
      },
      {
        displayValue: '고암동선진에프앤비',
        value: '837',
      },
      {
        displayValue: '신길동맛있는구내식당',
        value: '836',
      },
      {
        displayValue: '목내동열린식당',
        value: '835',
      },
      {
        displayValue: '평택시신화JH구내식당',
        value: '834',
      },
      {
        displayValue: '논현동한빛레이저텍위탁급식소A',
        value: '833',
      },
      {
        displayValue: '삼정동배꼽시계식당',
        value: '832',
      },
      {
        displayValue: '마곡동동익식당',
        value: '831',
      },
      {
        displayValue: '평택시장금이한식부페',
        value: '830',
      },
      {
        displayValue: '목내동다복식당',
        value: '829',
      },
      {
        displayValue: '고잔동미루나무집',
        value: '828',
      },
      {
        displayValue: '화성시네츄럴푸드동부케어점',
        value: '827',
      },
      {
        displayValue: '고색동왕의밥상',
        value: '826',
      },
      {
        displayValue: '성곡동집밥정여사한식뷔페',
        value: '825',
      },
      {
        displayValue: '정왕동전주식당',
        value: '824',
      },
      {
        displayValue: '가좌동케이원푸드',
        value: '823',
      },
      {
        displayValue: '경서동화영푸드',
        value: '822',
      },
      {
        displayValue: '고잔동자연의맛셀프식당',
        value: '821',
      },
      {
        displayValue: '서운동씨제이프레시웨이티비티점',
        value: '820',
      },
      {
        displayValue: '청주시지씨에스자이CNA오창에너지점',
        value: '819',
      },
      {
        displayValue: '청주시공기밥주식회사',
        value: '818',
      },
      {
        displayValue: '평택시진위행복뷔페A',
        value: '817',
      },
      {
        displayValue: '고잔동그린푸드구내식당',
        value: '816',
      },
      {
        displayValue: '남촌동성우식당',
        value: '815',
      },
      {
        displayValue: '화성시미가웰빙식당',
        value: '814',
      },
      {
        displayValue: '광주시나이스캐더링라인물류',
        value: '813',
      },
      {
        displayValue: '지제동진구네한식뷔페',
        value: '812',
      },
      {
        displayValue: '문형동정스도시락',
        value: '811',
      },
      {
        displayValue: '동천동아가페요양원',
        value: '810',
      },
      {
        displayValue: '동천동명성푸드',
        value: '809',
      },
      {
        displayValue: '오금동급식연구소사랑하는교회점(돌봄)',
        value: '808',
      },
      {
        displayValue: '신길동서울성애병원',
        value: '807',
      },
      {
        displayValue: '영덕동현대FOOD',
        value: '806',
      },
      {
        displayValue: '안성시웰컴플레이팅',
        value: '805',
      },
      {
        displayValue: '철산동광명성애병원',
        value: '804',
      },
      {
        displayValue: '화성시다모아한식셀프식당',
        value: '803',
      },
      {
        displayValue: '김포시소담한식부페',
        value: '802',
      },
      {
        displayValue: '가락동삼시세끼찬',
        value: '801',
      },
      {
        displayValue: '점봉동쿠팡여주센터',
        value: '800',
      },
      {
        displayValue: '이천시쿠팡이천3센터',
        value: '799',
      },
      {
        displayValue: '양평동(주)파인쿡',
        value: '798',
      },
      {
        displayValue: '수산동(주)씨에프지굿모닝요양원점',
        value: '797',
      },
      {
        displayValue: '가수동동문한식부페',
        value: '796',
      },
      {
        displayValue: '미아동신일고등학교(해지)',
        value: '795',
      },
      {
        displayValue: '안성시자매한정식뷔페',
        value: '794',
      },
      {
        displayValue: '화성시우리집자연밥상금당리',
        value: '793',
      },
      {
        displayValue: '화성시다온한식뷔페',
        value: '792',
      },
      {
        displayValue: '청천동메가푸드',
        value: '791',
      },
      {
        displayValue: '지제동해와달한식뷔페',
        value: '790',
      },
      {
        displayValue: '대치동씨제이프레시웨이시대인재N관점',
        value: '789',
      },
      {
        displayValue: '대치동씨제이프레시웨이시대인재신관점',
        value: '788',
      },
      {
        displayValue: '목동씨제이프레시웨이시대인재목동관점(8층)',
        value: '787',
      },
      {
        displayValue: '목동씨제이프레시웨이시대인재목동관점(7층)',
        value: '786',
      },
      {
        displayValue: '상야동(주)더베스트유원',
        value: '785',
      },
      {
        displayValue: '용인시백년밥상',
        value: '784',
      },
      {
        displayValue: '우만동씨제이프레시웨이우만종합사회복지관',
        value: '783',
      },
      {
        displayValue: '원미동더드림포차식당',
        value: '782',
      },
      {
        displayValue: '화성시베스트푸드케터링코디화성공장',
        value: '781',
      },
      {
        displayValue: '풍산동굿푸드',
        value: '780',
      },
      {
        displayValue: '이천시해남한식뷔페',
        value: '779',
      },
      {
        displayValue: '고잔동대경',
        value: '778',
      },
      {
        displayValue: '화성시이모네한식뷔페',
        value: '777',
      },
      {
        displayValue: '남동고은요양원',
        value: '776',
      },
      {
        displayValue: '원동롯데식당',
        value: '775',
      },
      {
        displayValue: '논현동씨제이프레시웨이바노바기피부과',
        value: '774',
      },
      {
        displayValue: '화성시본가한식부페',
        value: '773',
      },
      {
        displayValue: '망월동더푸드플러스',
        value: '772',
      },
      {
        displayValue: '정왕동위드온시니어센터',
        value: '771',
      },
      {
        displayValue: '여주시원조잔치음식백화점',
        value: '770',
      },
      {
        displayValue: '개화동(주)한성세종푸드강서차고지점',
        value: '769',
      },
      {
        displayValue: '원창동엄마손뷔페1',
        value: '768',
      },
      {
        displayValue: '화양동씨제이프레시웨이건대병원점',
        value: '767',
      },
      {
        displayValue: '화성시화진',
        value: '766',
      },
      {
        displayValue: '당산동수미가',
        value: '765',
      },
      {
        displayValue: '화성시명품한식뷔페(신남리)',
        value: '764',
      },
      {
        displayValue: '역삼동부어푸드',
        value: '763',
      },
      {
        displayValue: '용인시밥집',
        value: '762',
      },
      {
        displayValue: '당정동그린푸드',
        value: '761',
      },
      {
        displayValue: '송도동키친32',
        value: '760',
      },
      {
        displayValue: '덕계동신화식당',
        value: '759',
      },
      {
        displayValue: '김포시오가네식탁',
        value: '758',
      },
      {
        displayValue: '파주시예가한식부페',
        value: '757',
      },
      {
        displayValue: '석남동모닝식당',
        value: '756',
      },
      {
        displayValue: '원미동부자네집밥',
        value: '755',
      },
      {
        displayValue: '새솔동주식회사보경푸드',
        value: '754',
      },
      {
        displayValue: '송동베스트푸드케터링동탄현장점',
        value: '753',
      },
      {
        displayValue: '가수동베스트푸드케터링세교현장점',
        value: '752',
      },
      {
        displayValue: '역삼동진선여자중학교',
        value: '751',
      },
      {
        displayValue: '남촌동나노앤텍위탁급식소',
        value: '750',
      },
      {
        displayValue: '가좌동자연밥상',
        value: '749',
      },
      {
        displayValue: '논현동아진케이에스비위탁급식소',
        value: '748',
      },
      {
        displayValue: '고덕동휴먼에코푸드GS자이센트로',
        value: '747',
      },
      {
        displayValue: '신동휴먼에코푸드태영',
        value: '746',
      },
      {
        displayValue: '장지동휴먼에코푸드GS동탄',
        value: '745',
      },
      {
        displayValue: '가좌동믿음한식뷔페',
        value: '744',
      },
      {
        displayValue: '고림동용인숲요양원',
        value: '743',
      },
      {
        displayValue: '남촌동거화',
        value: '742',
      },
      {
        displayValue: '철산동해피락광명',
        value: '741',
      },
      {
        displayValue: '성곡동마루식당',
        value: '740',
      },
      {
        displayValue: '화성시호남한식뷔페팔탄점',
        value: '739',
      },
      {
        displayValue: '화성시다성',
        value: '738',
      },
      {
        displayValue: '안녕동한샘한식뷔페',
        value: '737',
      },
      {
        displayValue: '사노동디엔비푸드',
        value: '736',
      },
      {
        displayValue: '화성시큰손셀프밥상',
        value: '735',
      },
      {
        displayValue: '오류동쿠킹스토리',
        value: '734',
      },
      {
        displayValue: '정왕동이지비아식당',
        value: '733',
      },
      {
        displayValue: '정왕동천일식당A',
        value: '732',
      },
      {
        displayValue: '고잔동제이에이치구내식당',
        value: '731',
      },
      {
        displayValue: '이천시한식부페',
        value: '730',
      },
      {
        displayValue: '평택시에이치푸드스토리',
        value: '729',
      },
      {
        displayValue: '김포시건강한밥상',
        value: '728',
      },
      {
        displayValue: '화성시호남한식뷔페',
        value: '727',
      },
      {
        displayValue: '운서동씨제이프레쉬웨이인스파이어점',
        value: '726',
      },
      {
        displayValue: '화성시마도면진수성찬',
        value: '725',
      },
      {
        displayValue: '호계동메인푸드',
        value: '724',
      },
      {
        displayValue: '십정동더힐링푸드',
        value: '723',
      },
      {
        displayValue: '석수동주식회사참푸드시스템신화콘텍점',
        value: '722',
      },
      {
        displayValue: '연건동주식회사참푸드시스템서울의과대점',
        value: '721',
      },
      {
        displayValue: '송도동화성푸드',
        value: '720',
      },
      {
        displayValue: '내동행복한식부페식당',
        value: '719',
      },
      {
        displayValue: '화성시행복한식부페',
        value: '718',
      },
      {
        displayValue: '신정동서울신서초등학교',
        value: '717',
      },
      {
        displayValue: '평택시호남한식뷔페',
        value: '716',
      },
      {
        displayValue: '김포시한식대국',
        value: '715',
      },
      {
        displayValue: '김포시착한밥상A',
        value: '714',
      },
      {
        displayValue: '오류동한식명가',
        value: '713',
      },
      {
        displayValue: '송도동다정이네',
        value: '712',
      },
      {
        displayValue: '정왕동정다운한식부페',
        value: '711',
      },
      {
        displayValue: '마곡동주식회사아스코리아마곡1호점',
        value: '710',
      },
      {
        displayValue: '유방동(주)푸드우후죽순',
        value: '709',
      },
      {
        displayValue: '덕풍동오롯한상',
        value: '708',
      },
      {
        displayValue: '송도동제철밥상',
        value: '707',
      },
      {
        displayValue: '고잔동제이에이치위탁급식소',
        value: '706',
      },
      {
        displayValue: '화성시사과나무한식뷔페',
        value: '705',
      },
      {
        displayValue: '송도동온누리한식뷔페',
        value: '704',
      },
      {
        displayValue: '남북동둥지한식부페1',
        value: '703',
      },
      {
        displayValue: '정발산동이루다학교',
        value: '702',
      },
      {
        displayValue: '방교동다인푸드',
        value: '701',
      },
      {
        displayValue: '당동온누리',
        value: '700',
      },
      {
        displayValue: '영화동새봄요양원',
        value: '699',
      },
      {
        displayValue: '마평동행복누리',
        value: '698',
      },
      {
        displayValue: '화성시해뜨는마을',
        value: '697',
      },
      {
        displayValue: '용인시하늘의별',
        value: '696',
      },
      {
        displayValue: '안녕동미소요양원',
        value: '695',
      },
      {
        displayValue: '지곡동해리티지',
        value: '694',
      },
      {
        displayValue: '중동해피홈스쿨',
        value: '693',
      },
      {
        displayValue: '안녕동미소드림요양원',
        value: '692',
      },
      {
        displayValue: '동백동행복한동백',
        value: '691',
      },
      {
        displayValue: '세교동세교샘너싱홈',
        value: '690',
      },
      {
        displayValue: '신봉동지구촌',
        value: '689',
      },
      {
        displayValue: '반송동다정마을',
        value: '688',
      },
      {
        displayValue: '내동오복식당',
        value: '687',
      },
      {
        displayValue: '삼정동자연밥상한식뷔페',
        value: '686',
      },
      {
        displayValue: '가좌동청명식당',
        value: '685',
      },
      {
        displayValue: '병점동병태네한식뷔페',
        value: '684',
      },
      {
        displayValue: '병점동영자네한식뷔페',
        value: '683',
      },
      {
        displayValue: '능동웨알유',
        value: '682',
      },
      {
        displayValue: '양주시발해',
        value: '681',
      },
      {
        displayValue: '석남동경희식당',
        value: '680',
      },
      {
        displayValue: '화성시다드림2호점한식뷔페',
        value: '679',
      },
      {
        displayValue: '목5동양정고등학교',
        value: '678',
      },
      {
        displayValue: '파주시일등웰빙푸드아이오베드점',
        value: '677',
      },
      {
        displayValue: '마곡동(주)그린푸드',
        value: '676',
      },
      {
        displayValue: '화성시삼시세끼한식뷔페',
        value: '675',
      },
      {
        displayValue: '쌍문동정의여자고등학교',
        value: '674',
      },
      {
        displayValue: '고덕동홈푸드(사랑과정성)공원점',
        value: '673',
      },
      {
        displayValue: '화성시한두레식당',
        value: '672',
      },
      {
        displayValue: '고덕동홈푸드(사랑과정성)고덕점',
        value: '671',
      },
      {
        displayValue: '봉천동서울문영여자고등학교',
        value: '670',
      },
      {
        displayValue: '장안동마더앤찬',
        value: '669',
      },
      {
        displayValue: '고잔동금화한식뷔페',
        value: '668',
      },
      {
        displayValue: '오류동구립장애인직업재활시설',
        value: '667',
      },
      {
        displayValue: '이천시트럭한식부페',
        value: '666',
      },
      {
        displayValue: '마곡동남원식당',
        value: '665',
      },
      {
        displayValue: '수서동(주)한성세종푸드원방테크점',
        value: '664',
      },
      {
        displayValue: '철산동(주)금강푸드세풍운수구내식당',
        value: '663',
      },
      {
        displayValue: '농서동(주)진수캐더링본사',
        value: '662',
      },
      {
        displayValue: '장안2동동국대학교사범대학부속고등학교',
        value: '661',
      },
      {
        displayValue: '고잔동동성식당',
        value: '660',
      },
      {
        displayValue: '당정동위대한밥상',
        value: '659',
      },
      {
        displayValue: '개포동수도전기공업고등학교',
        value: '658',
      },
      {
        displayValue: '화성시행복한밥상2',
        value: '657',
      },
      {
        displayValue: '화성시(주)영애푸드',
        value: '656',
      },
      {
        displayValue: '화성시고들한식부페',
        value: '655',
      },
      {
        displayValue: '정왕동행복맘식당',
        value: '654',
      },
      {
        displayValue: '남촌동제이디푸드1',
        value: '653',
      },
      {
        displayValue: '춘궁동급식연구소1',
        value: '652',
      },
      {
        displayValue: '신천동한식부페',
        value: '651',
      },
      {
        displayValue: '화성시우정식당',
        value: '650',
      },
      {
        displayValue: '화성시(주)휴먼에코푸드화성점',
        value: '649',
      },
      {
        displayValue: '화성시우리들한식부페',
        value: '648',
      },
      {
        displayValue: '금정동슬기로운밥상',
        value: '647',
      },
      {
        displayValue: '상대원동데일리푸드썬메가MYCHEF',
        value: '646',
      },
      {
        displayValue: '남북동둥지한식부페',
        value: '645',
      },
      {
        displayValue: '가좌동수라상',
        value: '644',
      },
      {
        displayValue: '가좌동더맛있는밥집',
        value: '643',
      },
      {
        displayValue: '고덕동(주)삼성웰스토리로지텍물류센터',
        value: '642',
      },
      {
        displayValue: '화성시우리한식',
        value: '641',
      },
      {
        displayValue: '회기동경희중학교',
        value: '640',
      },
      {
        displayValue: '대치동단국대학교사범대학부속고등학교',
        value: '639',
      },
      {
        displayValue: '청파동선린인터넷고등학교',
        value: '638',
      },
      {
        displayValue: '미산동서진푸드',
        value: '637',
      },
      {
        displayValue: '이천시(주)이천급식',
        value: '636',
      },
      {
        displayValue: '화성시전주한식뷔페귀래리',
        value: '635',
      },
      {
        displayValue: '신흥동3가이가네식당',
        value: '634',
      },
      {
        displayValue: '반포본동세화여자고등학교',
        value: '633',
      },
      {
        displayValue: '대치동휘문고등학교',
        value: '632',
      },
      {
        displayValue: '상대원동데일리푸드썬메가1',
        value: '631',
      },
      {
        displayValue: '화성시다온한식부폐',
        value: '630',
      },
      {
        displayValue: '운서동청정제주흑돼지',
        value: '629',
      },
      {
        displayValue: '오류동명진구내식당',
        value: '628',
      },
      {
        displayValue: '오류동동해',
        value: '627',
      },
      {
        displayValue: '화성시장금이한식뷔페서근리점',
        value: '626',
      },
      {
        displayValue: '화성시원조전주식당',
        value: '625',
      },
      {
        displayValue: '운양동찬마루',
        value: '624',
      },
      {
        displayValue: '남촌동제이디푸드',
        value: '623',
      },
      {
        displayValue: '정왕동동우식당',
        value: '622',
      },
      {
        displayValue: '배곧동행복한식당',
        value: '621',
      },
      {
        displayValue: '안녕동온누리한식뷔페',
        value: '620',
      },
      {
        displayValue: '화성시만석한식부페',
        value: '619',
      },
      {
        displayValue: '장지동뉴서울식당',
        value: '618',
      },
      {
        displayValue: '관양동더런치타임1',
        value: '617',
      },
      {
        displayValue: '독산동한끼밥상',
        value: '616',
      },
      {
        displayValue: '화성시고향한식뷔페',
        value: '615',
      },
      {
        displayValue: '논현동한빛레이저텍위탁급식소1',
        value: '614',
      },
      {
        displayValue: '가산동두레밥상둥근',
        value: '613',
      },
      {
        displayValue: '문정동봄날',
        value: '612',
      },
      {
        displayValue: '화성시더행복한밥상한식뷔페',
        value: '611',
      },
      {
        displayValue: '가재동(주)MSF늘푸른요양원늘푸른집동',
        value: '610',
      },
      {
        displayValue: '가재동(주)MSF늘푸른요양원글로리동',
        value: '609',
      },
      {
        displayValue: '화성시장금이한식뷔페문학리점',
        value: '608',
      },
      {
        displayValue: '화성시비봉면아정뷔페',
        value: '607',
      },
      {
        displayValue: '배곧동미나봉테이블',
        value: '606',
      },
      {
        displayValue: '청천동전원',
        value: '605',
      },
      {
        displayValue: '화성시맛있는밥상',
        value: '604',
      },
      {
        displayValue: '화성시진수성찬한식뷔페',
        value: '603',
      },
      {
        displayValue: '화성시수연한식뷔페',
        value: '602',
      },
      {
        displayValue: '파주시자연의밥상한식뷔페',
        value: '601',
      },
      {
        displayValue: '정왕동행복한밥상A',
        value: '600',
      },
      {
        displayValue: '부곡동바른푸드',
        value: '599',
      },
      {
        displayValue: '농서동(주)진수캐더링NRD-K',
        value: '598',
      },
      {
        displayValue: '가좌동스마트구내식당',
        value: '597',
      },
      {
        displayValue: '지영동삼시세끼',
        value: '596',
      },
      {
        displayValue: '평택시(주)제이엘푸드',
        value: '595',
      },
      {
        displayValue: '서패동집밥처럼',
        value: '594',
      },
      {
        displayValue: '화성시교보한식뷔페1',
        value: '593',
      },
      {
        displayValue: '송도동셀트리온2공장',
        value: '592',
      },
      {
        displayValue: '가산동행복한한식뷔페',
        value: '591',
      },
      {
        displayValue: '화성시산들한식부페',
        value: '590',
      },
      {
        displayValue: '화성시우리한식뷔페',
        value: '589',
      },
      {
        displayValue: '화성시날마다집밥한식뷔페',
        value: '588',
      },
      {
        displayValue: '파주시부곡한식뷔페',
        value: '587',
      },
      {
        displayValue: '교동웰컴플레이팅',
        value: '586',
      },
      {
        displayValue: '한강로3가용산전자랜드식당',
        value: '585',
      },
      {
        displayValue: '논현동나나성형외과(주)푸디스엘엔에프',
        value: '584',
      },
      {
        displayValue: '가좌동충남한식뷔페1',
        value: '583',
      },
      {
        displayValue: '화성시명성한식부페',
        value: '582',
      },
      {
        displayValue: '성곡동일미식당',
        value: '581',
      },
      {
        displayValue: '화성시행복한밥상A',
        value: '580',
      },
      {
        displayValue: '원창동자연밥상',
        value: '579',
      },
      {
        displayValue: '화성시소담식당',
        value: '578',
      },
      {
        displayValue: '구로동알찬푸드',
        value: '577',
      },
      {
        displayValue: '문정동하늘뷔페',
        value: '576',
      },
      {
        displayValue: '화성시고을한식뷔페1',
        value: '575',
      },
      {
        displayValue: '성곡동전주부페식당',
        value: '574',
      },
      {
        displayValue: '홍은동더드림',
        value: '573',
      },
      {
        displayValue: '송도동소담맥스송도',
        value: '572',
      },
      {
        displayValue: '원미동부자네집밥(해지)',
        value: '571',
      },
      {
        displayValue: '영천동다드림한식뷔페',
        value: '570',
      },
      {
        displayValue: '연건동서울대의과대식당',
        value: '569',
      },
      {
        displayValue: '개화동금강강서차고지식당',
        value: '568',
      },
      {
        displayValue: '김포시3단지남도한식뷔페',
        value: '567',
      },
      {
        displayValue: '오류동더쿠킹한식부페',
        value: '566',
      },
      {
        displayValue: '지제동모정한식',
        value: '565',
      },
      {
        displayValue: '회기동경희고등학교(해지)',
        value: '564',
      },
      {
        displayValue: '원당동참된식당',
        value: '563',
      },
      {
        displayValue: '화성시투더리삼겹살',
        value: '562',
      },
      {
        displayValue: '화성시우람식당',
        value: '561',
      },
      {
        displayValue: '용인시에이스푸드주식회사',
        value: '560',
      },
      {
        displayValue: '화성시교보한식뷔페',
        value: '559',
      },
      {
        displayValue: '금곡동아이푸드파크한식뷔페',
        value: '558',
      },
      {
        displayValue: '구월동자연밥상',
        value: '557',
      },
      {
        displayValue: '화성시기린푸드',
        value: '556',
      },
      {
        displayValue: '평택시주식회사이에이치푸드',
        value: '555',
      },
      {
        displayValue: '평택시진수성찬',
        value: '554',
      },
      {
        displayValue: '화성시보성한식뷔페',
        value: '553',
      },
      {
        displayValue: '관양동원테이블',
        value: '552',
      },
      {
        displayValue: '소사동주식회사엠에스에프',
        value: '551',
      },
      {
        displayValue: '을왕동어머니가차린밥상',
        value: '550',
      },
      {
        displayValue: '목내동기광한식부페',
        value: '549',
      },
      {
        displayValue: '농서동이에이치푸드지상',
        value: '548',
      },
      {
        displayValue: '반포동이에이치푸드이베일리점',
        value: '547',
      },
      {
        displayValue: '화성시더맛한식뷔페',
        value: '546',
      },
      {
        displayValue: '화성시대흥한식뷔페',
        value: '545',
      },
      {
        displayValue: '청덕동조은식당',
        value: '544',
      },
      {
        displayValue: '가산동태세라한식',
        value: '543',
      },
      {
        displayValue: '원창동엄마손뷔페',
        value: '542',
      },
      {
        displayValue: '평택시오산한식부페',
        value: '541',
      },
      {
        displayValue: '한강로3가씨제이프레시웨이CGV본사점',
        value: '540',
      },
      {
        displayValue: '동천동원푸드코리아동천지점',
        value: '539',
      },
      {
        displayValue: '성곡동베스트푸드케터링맨파워점',
        value: '538',
      },
      {
        displayValue: '화성시미채원',
        value: '537',
      },
      {
        displayValue: '성곡동사랑채한식명가',
        value: '536',
      },
      {
        displayValue: '덕풍동미사리한식뷔페',
        value: '535',
      },
      {
        displayValue: '대장동주식회사수인밸리',
        value: '534',
      },
      {
        displayValue: '신동친구뷔페식당',
        value: '533',
      },
      {
        displayValue: '풍산동에어패스',
        value: '532',
      },
      {
        displayValue: '김포시엄마손푸드(김포)',
        value: '531',
      },
      {
        displayValue: '화성시원조전주식당(해지)',
        value: '530',
      },
      {
        displayValue: '신림동한남운수구내식당',
        value: '529',
      },
      {
        displayValue: '화성시식도락가',
        value: '528',
      },
      {
        displayValue: '고덕동포세카한전지점',
        value: '527',
      },
      {
        displayValue: '화성시석포리맛집',
        value: '526',
      },
      {
        displayValue: '항동에스케이브이원한식뷔페',
        value: '525',
      },
      {
        displayValue: '내손동N-food안양점',
        value: '524',
      },
      {
        displayValue: '성곡동베스트푸드케터링쿠팡안산2센터점',
        value: '523',
      },
      {
        displayValue: '화성시해양마루한식뷔페',
        value: '522',
      },
      {
        displayValue: '정왕동대형식당',
        value: '521',
      },
      {
        displayValue: '남북동둥지한식부페(해지)',
        value: '520',
      },
      {
        displayValue: '을왕동장수골한식뷔페',
        value: '519',
      },
      {
        displayValue: '화성시대성한식뷔페',
        value: '518',
      },
      {
        displayValue: '논현동전일식당',
        value: '517',
      },
      {
        displayValue: '정왕동행복한밥상(시흥시)',
        value: '516',
      },
      {
        displayValue: '정왕동청정제주흑돼지',
        value: '515',
      },
      {
        displayValue: '송산동하늘밥집',
        value: '514',
      },
      {
        displayValue: '하안동보영운수구내식당',
        value: '513',
      },
      {
        displayValue: '고색동쿡앤푸드',
        value: '512',
      },
      {
        displayValue: '화성시사계절한식뷔페(남양)',
        value: '511',
      },
      {
        displayValue: '김포시미소밥상',
        value: '510',
      },
      {
        displayValue: '삼정동왕의밥상',
        value: '509',
      },
      {
        displayValue: '서운동웰빙푸드한식뷔페',
        value: '508',
      },
      {
        displayValue: '다산동탑클래스푸드',
        value: '507',
      },
      {
        displayValue: '호계동평촌메가푸드',
        value: '506',
      },
      {
        displayValue: '이매동메가푸드',
        value: '505',
      },
      {
        displayValue: '서초동메가푸드서초지점',
        value: '504',
      },
      {
        displayValue: '소하동메가푸드광명점',
        value: '503',
      },
      {
        displayValue: '신정동양천차고지구내식당',
        value: '502',
      },
      {
        displayValue: '고잔동삼천리기계구내식당',
        value: '501',
      },
      {
        displayValue: '화성시늘솜한식뷔페',
        value: '500',
      },
      {
        displayValue: '가좌동두진푸드시스템',
        value: '499',
      },
      {
        displayValue: '석남동전주식당',
        value: '498',
      },
      {
        displayValue: '화성시푸짐한밥상',
        value: '497',
      },
      {
        displayValue: '가좌동신안식당',
        value: '496',
      },
      {
        displayValue: '김포시두레한식부페2호점',
        value: '495',
      },
      {
        displayValue: '망원동코노니아',
        value: '494',
      },
      {
        displayValue: '신흥동내트럭하우스',
        value: '493',
      },
      {
        displayValue: '목내동다온푸드',
        value: '492',
      },
      {
        displayValue: '청라동대현식당',
        value: '491',
      },
      {
        displayValue: '도당동더드림',
        value: '490',
      },
      {
        displayValue: '당정동이룸푸드',
        value: '489',
      },
      {
        displayValue: '가좌동진미식당',
        value: '488',
      },
      {
        displayValue: '화성시휴먼에코푸드봉담점',
        value: '487',
      },
      {
        displayValue: '안양동주식회사하이큐시스템',
        value: '486',
      },
      {
        displayValue: '화성시만나웰빙한식부페',
        value: '485',
      },
      {
        displayValue: '호계동오늘밥상',
        value: '484',
      },
      {
        displayValue: '영천동밥사랑한식뷔페',
        value: '483',
      },
      {
        displayValue: '가좌동천지식당',
        value: '482',
      },
      {
        displayValue: '여주시본토푸드이천점',
        value: '481',
      },
      {
        displayValue: '김포시미소밥상(해지)',
        value: '480',
      },
      {
        displayValue: '도당동호남한식부페',
        value: '479',
      },
      {
        displayValue: '운서동엄마손뷔페',
        value: '478',
      },
      {
        displayValue: '정왕동정진부폐식당',
        value: '477',
      },
      {
        displayValue: '망포동고기가살살녹소',
        value: '476',
      },
      {
        displayValue: '고덕동포세카고덕점B',
        value: '475',
      },
      {
        displayValue: '고덕동포세카고덕점A',
        value: '474',
      },
      {
        displayValue: '평택시자연을담은밥상',
        value: '473',
      },
      {
        displayValue: '둔촌동강동푸드원',
        value: '472',
      },
      {
        displayValue: '신천동금강푸드잠실진주',
        value: '471',
      },
      {
        displayValue: '안양동행복한밥상',
        value: '470',
      },
      {
        displayValue: '지제동민경집밥',
        value: '469',
      },
      {
        displayValue: '고덕동다우리한식뷔페본점',
        value: '468',
      },
      {
        displayValue: '화성시부자식당',
        value: '467',
      },
      {
        displayValue: '김포시풍년식당',
        value: '466',
      },
      {
        displayValue: '평택시민경한식',
        value: '465',
      },
      {
        displayValue: '고잔동민트위탁급식소',
        value: '464',
      },
      {
        displayValue: '을왕동어머니가차린밥상(해지)',
        value: '463',
      },
      {
        displayValue: '농서동뽕가네한식부페',
        value: '462',
      },
      {
        displayValue: '망월동위니드밥',
        value: '461',
      },
      {
        displayValue: '화성시해연밥샵',
        value: '460',
      },
      {
        displayValue: '고잔동오성에스티급식소',
        value: '459',
      },
      {
        displayValue: '신동김셰프의집밥',
        value: '458',
      },
      {
        displayValue: '계수동맛터셀프부페',
        value: '457',
      },
      {
        displayValue: '송도동씨제이프레시웨이SK석유화학점',
        value: '456',
      },
      {
        displayValue: '고색동집밥한식뷔페',
        value: '455',
      },
      {
        displayValue: '농서동정담은밥상',
        value: '454',
      },
      {
        displayValue: '화성시엉클푸드',
        value: '453',
      },
      {
        displayValue: '가락동나이스캐더링',
        value: '452',
      },
      {
        displayValue: '호계동평촌메가푸드(해지)',
        value: '451',
      },
      {
        displayValue: '청주시청원생명축제',
        value: '450',
      },
      {
        displayValue: '이매동메가푸드(해지)',
        value: '449',
      },
      {
        displayValue: '영천동풀무원푸드앤컬처',
        value: '448',
      },
      {
        displayValue: '화성시라온한식',
        value: '447',
      },
      {
        displayValue: '김포시착한밥상',
        value: '446',
      },
      {
        displayValue: '고잔동아이에스테크',
        value: '445',
      },
      {
        displayValue: '평택시만나한식부페',
        value: '444',
      },
      {
        displayValue: '김포시사계절한식부페',
        value: '443',
      },
      {
        displayValue: '동자동씨제이프레시웨이올리브네트웍스점',
        value: '442',
      },
      {
        displayValue: '고색동정가네밥상',
        value: '441',
      },
      {
        displayValue: '정왕동예담푸드',
        value: '440',
      },
      {
        displayValue: '일직동정다운푸드',
        value: '439',
      },
      {
        displayValue: '평택시뉴그린한식뷔페',
        value: '438',
      },
      {
        displayValue: '화성시만석골',
        value: '437',
      },
      {
        displayValue: '상대원동자연밥상',
        value: '436',
      },
      {
        displayValue: '화성시우리집자연밥상',
        value: '435',
      },
      {
        displayValue: '마두동밥이보약',
        value: '434',
      },
      {
        displayValue: '상대원동노벨구내식당',
        value: '433',
      },
      {
        displayValue: '성곡동타크라A구내식당',
        value: '432',
      },
      {
        displayValue: '성곡동타크라B구내식당',
        value: '431',
      },
      {
        displayValue: '성곡동타크라구내식당(해지)',
        value: '430',
      },
      {
        displayValue: '화성시진미푸드',
        value: '429',
      },
      {
        displayValue: '의정부동참좋은푸드',
        value: '428',
      },
      {
        displayValue: '송현동송현식당',
        value: '427',
      },
      {
        displayValue: '화성시정가네식당(파인테크닉스점)',
        value: '426',
      },
      {
        displayValue: '화성시정가네밥상',
        value: '425',
      },
      {
        displayValue: '여주시본토푸드(에스앤에스)',
        value: '424',
      },
      {
        displayValue: '군자동미소한식뷔페',
        value: '423',
      },
      {
        displayValue: '소사본동맛골한식뷔페',
        value: '422',
      },
      {
        displayValue: '관양동대월푸드',
        value: '421',
      },
      {
        displayValue: '파주시착한한식부페',
        value: '420',
      },
      {
        displayValue: '파주시킴스도시락한식부페',
        value: '419',
      },
      {
        displayValue: '가양동빅스푼',
        value: '418',
      },
      {
        displayValue: '계수동(주)두리밥상',
        value: '417',
      },
      {
        displayValue: '정왕동행운식당',
        value: '416',
      },
      {
        displayValue: '화성시에이치푸드',
        value: '415',
      },
      {
        displayValue: '화성시다드림2호점한식뷔페(해지)',
        value: '414',
      },
      {
        displayValue: '화성시명품한식부페',
        value: '413',
      },
      {
        displayValue: '화성시착한집밥한식부페',
        value: '412',
      },
      {
        displayValue: '송도동메이드인맘비티점',
        value: '411',
      },
      {
        displayValue: '야탑동바실리움',
        value: '410',
      },
      {
        displayValue: '호계동에스케이이룸푸드2',
        value: '409',
      },
      {
        displayValue: '오류동집밥삼시세끼',
        value: '408',
      },
      {
        displayValue: '송도동메이드인맘',
        value: '407',
      },
      {
        displayValue: '원흥동(주)더바른푸드',
        value: '406',
      },
      {
        displayValue: '정왕동복지한식부페',
        value: '405',
      },
      {
        displayValue: '정왕동대신셀프식당',
        value: '404',
      },
      {
        displayValue: '서초동메가푸드서초지점(해지)',
        value: '403',
      },
      {
        displayValue: '석남동오성구내식당',
        value: '402',
      },
      {
        displayValue: '안양동해마루집밥한식뷔페',
        value: '401',
      },
      {
        displayValue: '화성시밥향기',
        value: '400',
      },
      {
        displayValue: '화성시정다운한식부페',
        value: '399',
      },
      {
        displayValue: '석남동명가식당',
        value: '398',
      },
      {
        displayValue: '화성시행복한밥상1',
        value: '397',
      },
      {
        displayValue: '화성시장금이한식부페고지리점',
        value: '396',
      },
      {
        displayValue: '화성시항동한식부페',
        value: '395',
      },
      {
        displayValue: '목내동힐링푸드',
        value: '394',
      },
      {
        displayValue: '상동집밥처럼(해지)',
        value: '393',
      },
      {
        displayValue: '농서동정담은밥상(해지)',
        value: '392',
      },
      {
        displayValue: '화성시행복찬합도시락',
        value: '391',
      },
      {
        displayValue: '정왕동범이네한식뷔페',
        value: '390',
      },
      {
        displayValue: '가좌동주식회사운영푸드시스템',
        value: '389',
      },
      {
        displayValue: '오정동한샘한식뷔페',
        value: '388',
      },
      {
        displayValue: '신천동한식부페(해지)',
        value: '387',
      },
      {
        displayValue: '화성시장금이한식부페본점',
        value: '386',
      },
      {
        displayValue: '화성시화성한식부페',
        value: '385',
      },
      {
        displayValue: '화성시장금이한식부페(장안)',
        value: '384',
      },
      {
        displayValue: '파주시신촌한식부페',
        value: '383',
      },
      {
        displayValue: '길동진수성찬',
        value: '382',
      },
      {
        displayValue: '도화동사이참한식부페',
        value: '381',
      },
      {
        displayValue: '화성시명품한식부페(율암리)',
        value: '380',
      },
      {
        displayValue: '화성시민지한식뷔페',
        value: '379',
      },
      {
        displayValue: '화성시호남식당',
        value: '378',
      },
      {
        displayValue: '화성시부영한식부페',
        value: '377',
      },
      {
        displayValue: '화성시전라도한식부페(송산)',
        value: '376',
      },
      {
        displayValue: '화성시고을한식부페',
        value: '375',
      },
      {
        displayValue: '평택시아름다운한식부페',
        value: '374',
      },
      {
        displayValue: '연수동대경에프앤비',
        value: '373',
      },
      {
        displayValue: '부평동디케이푸드',
        value: '372',
      },
      {
        displayValue: '가좌동충남한식부페',
        value: '371',
      },
      {
        displayValue: '청천동굿푸드',
        value: '370',
      },
      {
        displayValue: '삼정동부흥한식부페',
        value: '369',
      },
      {
        displayValue: '도당동유성뷔페식당',
        value: '368',
      },
      {
        displayValue: '화성시사계절한식뷔페(팔탄)',
        value: '367',
      },
      {
        displayValue: '가좌동백록식당(해지)',
        value: '366',
      },
      {
        displayValue: '고잔동아일식당',
        value: '365',
      },
      {
        displayValue: '독산동미소',
        value: '364',
      },
      {
        displayValue: '이천시남도한식당',
        value: '363',
      },
      {
        displayValue: '화성시더쉐프한식뷔페구내식당',
        value: '362',
      },
      {
        displayValue: '화성시전주한식부페사창리',
        value: '361',
      },
      {
        displayValue: '화성시참조은한식부페',
        value: '360',
      },
      {
        displayValue: '화성시풍성한식부페',
        value: '359',
      },
      {
        displayValue: '마곡동맘스푸드',
        value: '358',
      },
      {
        displayValue: '정왕동풍남식당',
        value: '357',
      },
      {
        displayValue: '화성시가온한식뷔페',
        value: '356',
      },
      {
        displayValue: 'CJ프레쉬웨이본사',
        value: '355',
      },
      {
        displayValue: '가좌동믿음한식뷔페(해지)',
        value: '354',
      },
      {
        displayValue: '오류동일송식당(2호점)',
        value: '353',
      },
      {
        displayValue: '오류동일송식당(1호점)',
        value: '352',
      },
      {
        displayValue: '노량진동제일에프앤비(주)노량진점',
        value: '351',
      },
      {
        displayValue: '관양동정담푸드',
        value: '350',
      },
      {
        displayValue: '화성시한길뷔페',
        value: '349',
      },
      {
        displayValue: '평택시만나한식부페(해지)',
        value: '348',
      },
      {
        displayValue: '목내동금오식당',
        value: '347',
      },
      {
        displayValue: '화성시도현한식부페',
        value: '346',
      },
      {
        displayValue: '청천동펌텍구내식당',
        value: '345',
      },
      {
        displayValue: '신천동오늘은한식뷔페',
        value: '344',
      },
      {
        displayValue: '성곡동경원식당',
        value: '343',
      },
      {
        displayValue: '천호동도시락yea!',
        value: '342',
      },
      {
        displayValue: '평택시홈푸드식당',
        value: '341',
      },
      {
        displayValue: '화성시사계절한식뷔페(향남)',
        value: '340',
      },
      {
        displayValue: '지제동백억한식뷔페',
        value: '339',
      },
      {
        displayValue: '청천동굿푸드(해지)',
        value: '338',
      },
      {
        displayValue: '고잔동우리타운식당',
        value: '337',
      },
      {
        displayValue: '정왕동에이치케이씨구내식당',
        value: '336',
      },
      {
        displayValue: '정왕동산단셀프식당',
        value: '335',
      },
      {
        displayValue: '정왕동남도한식뷔페',
        value: '334',
      },
      {
        displayValue: '정왕동소망식당',
        value: '333',
      },
      {
        displayValue: '화성시더쉐프한식뷔페',
        value: '332',
      },
      {
        displayValue: '이동우렁각시',
        value: '331',
      },
      {
        displayValue: '고잔동동양급식소',
        value: '330',
      },
      {
        displayValue: '화성시라온한식(해지)',
        value: '329',
      },
      {
        displayValue: '정왕동제일식당',
        value: '328',
      },
      {
        displayValue: '고잔동사랑해밥상예림',
        value: '327',
      },
      {
        displayValue: '관양동사랑해밥상',
        value: '326',
      },
      {
        displayValue: '평택시주식회사블레싱푸드',
        value: '325',
      },
      {
        displayValue: '을왕동말숙이네식당',
        value: '324',
      },
      {
        displayValue: '을왕동박가네식당',
        value: '323',
      },
      {
        displayValue: '만석동일품한식당',
        value: '322',
      },
      {
        displayValue: '화성시장금이한식부페(정남)',
        value: '321',
      },
      {
        displayValue: '화성시와이푸드한식부페',
        value: '320',
      },
      {
        displayValue: '화성시송산한식부페',
        value: '319',
      },
      {
        displayValue: '내동다우테크한식푸드(해지)',
        value: '318',
      },
      {
        displayValue: '청라동성일구내식당',
        value: '317',
      },
      {
        displayValue: '부곡동뜰한식부페',
        value: '316',
      },
      {
        displayValue: '화성시성미식당',
        value: '315',
      },
      {
        displayValue: '왕곡동주식회사쿡프렌즈',
        value: '314',
      },
      {
        displayValue: '성곡동예문식당',
        value: '313',
      },
      {
        displayValue: '가좌동호남한식부페',
        value: '312',
      },
      {
        displayValue: '문발동다울한식부페',
        value: '311',
      },
      {
        displayValue: '부곡동다드림한식부페',
        value: '310',
      },
      {
        displayValue: '잠원동지씨에스반포2',
        value: '309',
      },
      {
        displayValue: '잠원동지씨에스반포1',
        value: '308',
      },
      {
        displayValue: '금정동정든셀프식당',
        value: '307',
      },
      {
        displayValue: '논현동화인정밀식당',
        value: '306',
      },
      {
        displayValue: '마곡동엄마손식당',
        value: '305',
      },
      {
        displayValue: '화성시정든한식부페',
        value: '304',
      },
      {
        displayValue: '화성시명품한식부페(해지)',
        value: '303',
      },
      {
        displayValue: '화성시정을담은한식뷔페',
        value: '302',
      },
      {
        displayValue: '이천시남도한부페',
        value: '301',
      },
      {
        displayValue: '화성시외갓집한식부페',
        value: '300',
      },
      {
        displayValue: '화성시하늘과땅한식부페',
        value: '299',
      },
      {
        displayValue: '화성시은혜한식부페',
        value: '298',
      },
      {
        displayValue: '화성시자연을담은밥상',
        value: '297',
      },
      {
        displayValue: '풍덕천동행복밥상',
        value: '296',
      },
      {
        displayValue: '화성시사계절한식뷔페',
        value: '295',
      },
      {
        displayValue: '화성시만나한식뷔페',
        value: '294',
      },
      {
        displayValue: '논현동원진급식소',
        value: '293',
      },
      {
        displayValue: '효성동전주식당',
        value: '292',
      },
      {
        displayValue: '소하동메가푸드광명점(해지)',
        value: '291',
      },
      {
        displayValue: '김포시유원한식뷔페',
        value: '290',
      },
      {
        displayValue: '성수동더존푸드',
        value: '289',
      },
      {
        displayValue: '십정동한샘한식부페',
        value: '288',
      },
      {
        displayValue: '거모동찬이랑밥이랑',
        value: '287',
      },
      {
        displayValue: '화성시청화대한식부페',
        value: '286',
      },
      {
        displayValue: '삼정동엄마손푸드',
        value: '285',
      },
      {
        displayValue: '가장동다온푸드',
        value: '284',
      },
      {
        displayValue: '화성시수담푸드시스템',
        value: '283',
      },
      {
        displayValue: '경서동삼화구내매점',
        value: '282',
      },
      {
        displayValue: '경서동해변식당',
        value: '281',
      },
      {
        displayValue: '화성시화성정기',
        value: '280',
      },
      {
        displayValue: '영등포동정가네식당',
        value: '279',
      },
      {
        displayValue: '화성시맛나한식부페',
        value: '278',
      },
      {
        displayValue: '호계동소나무푸드',
        value: '277',
      },
      {
        displayValue: '화성시우리들한식부페(해지)',
        value: '276',
      },
      {
        displayValue: '목내동태광식당',
        value: '275',
      },
      {
        displayValue: '화성시최가네한식뷔페',
        value: '274',
      },
      {
        displayValue: '평택시솔나무한식뷔페',
        value: '273',
      },
      {
        displayValue: '화성시행복한밥상',
        value: '272',
      },
      {
        displayValue: '신흥동엄마손푸드',
        value: '271',
      },
      {
        displayValue: '송도동지씨에스SK뷰',
        value: '270',
      },
      {
        displayValue: '김포시호박한식뷔페',
        value: '269',
      },
      {
        displayValue: '가산동우리솔잎푸드',
        value: '268',
      },
      {
        displayValue: '가산동돈토',
        value: '267',
      },
      {
        displayValue: '화성시하나웰빙한식뷔페',
        value: '266',
      },
      {
        displayValue: '평택시진위행복뷔페',
        value: '265',
      },
      {
        displayValue: '원곡동오토돔한식뷔페',
        value: '264',
      },
      {
        displayValue: '성곡동꽃님이네',
        value: '263',
      },
      {
        displayValue: '도화동조쉐프구내식당',
        value: '262',
      },
      {
        displayValue: '평택시청북시골집한식뷔페',
        value: '261',
      },
      {
        displayValue: '김포시3단지남도한식뷔페(해지)',
        value: '260',
      },
      {
        displayValue: '여의도동영등포50플러스센터',
        value: '259',
      },
      {
        displayValue: '문정동이셰프한식뷔페',
        value: '258',
      },
      {
        displayValue: '화성시만나웰빙한식부페(해지)',
        value: '257',
      },
      {
        displayValue: '삼정동아미가식당',
        value: '256',
      },
      {
        displayValue: '광주시정푸드(해지)',
        value: '255',
      },
      {
        displayValue: '평택시소풍한식뷔페',
        value: '254',
      },
      {
        displayValue: '장지동원푸드시스템',
        value: '253',
      },
      {
        displayValue: '원창동다래테크구내식당',
        value: '252',
      },
      {
        displayValue: '청천동명가식당',
        value: '251',
      },
      {
        displayValue: '오정동하나로에프에스',
        value: '250',
      },
      {
        displayValue: '정왕동예덕푸드',
        value: '249',
      },
      {
        displayValue: '청라동삼호구내식당',
        value: '248',
      },
      {
        displayValue: '화성시예찬한식부페',
        value: '247',
      },
      {
        displayValue: '능곡동한끼의행복',
        value: '246',
      },
      {
        displayValue: '김포시행복한밥상',
        value: '245',
      },
      {
        displayValue: '오전동이든푸드',
        value: '244',
      },
      {
        displayValue: '망원동플레이팅망원점',
        value: '243',
      },
      {
        displayValue: '원창동우리집원창점',
        value: '242',
      },
      {
        displayValue: '목내동대림구내식당',
        value: '241',
      },
      {
        displayValue: '화성시금당한식부페',
        value: '240',
      },
      {
        displayValue: '화성시아정부페',
        value: '239',
      },
      {
        displayValue: '화성시핫플매점',
        value: '238',
      },
      {
        displayValue: '화성시호남맛집',
        value: '237',
      },
      {
        displayValue: '도당동한샘골한식뷔페',
        value: '236',
      },
      {
        displayValue: '석남동우리집석남점',
        value: '235',
      },
      {
        displayValue: '논현동한빛레이저텍위탁급식소',
        value: '234',
      },
      {
        displayValue: '평택시오성기사뷔페',
        value: '233',
      },
      {
        displayValue: '구로동케이제이푸드',
        value: '232',
      },
      {
        displayValue: '가좌동엘림푸드',
        value: '231',
      },
      {
        displayValue: '원창동우람목재구내식당',
        value: '230',
      },
      {
        displayValue: '원창동푸짐한밥상',
        value: '229',
      },
      {
        displayValue: '정왕동엄마손뷔페',
        value: '228',
      },
      {
        displayValue: '삼동밥을그리다',
        value: '227',
      },
      {
        displayValue: '평택시드림푸드',
        value: '226',
      },
      {
        displayValue: '금정동김쉐프',
        value: '225',
      },
      {
        displayValue: '내동차림식당',
        value: '224',
      },
      {
        displayValue: '화성시미소한식뷔페2',
        value: '223',
      },
      {
        displayValue: '정왕동스틸한식부페2',
        value: '222',
      },
      {
        displayValue: '금이동행복한밥집',
        value: '221',
      },
      {
        displayValue: '평택시아시아식당',
        value: '220',
      },
      {
        displayValue: '도당동은성식당',
        value: '219',
      },
      {
        displayValue: '송도동맥스송도',
        value: '218',
      },
      {
        displayValue: '안양동프레쉬웰푸드',
        value: '217',
      },
      {
        displayValue: '화성시전라도한식부페(팔탄)',
        value: '216',
      },
      {
        displayValue: '화성시미소한식뷔페',
        value: '215',
      },
      {
        displayValue: '정왕동제일푸드한식뷔페',
        value: '214',
      },
      {
        displayValue: '영천동밥앤쿡',
        value: '213',
      },
      {
        displayValue: '상동이모네한식부페',
        value: '212',
      },
      {
        displayValue: '상대원동데일리푸드썬메가',
        value: '211',
      },
      {
        displayValue: '당정동예향한식부페2',
        value: '210',
      },
      {
        displayValue: '송도동디푸드',
        value: '209',
      },
      {
        displayValue: '학익동명성한식부페',
        value: '208',
      },
      {
        displayValue: '이천시황제참살이한식부페',
        value: '207',
      },
      {
        displayValue: '당정동행운푸드',
        value: '206',
      },
      {
        displayValue: '정왕동큰손',
        value: '205',
      },
      {
        displayValue: '정왕동은혜',
        value: '204',
      },
      {
        displayValue: '정왕동우리',
        value: '203',
      },
      {
        displayValue: '정왕동좋은',
        value: '202',
      },
      {
        displayValue: '목내동맥스',
        value: '201',
      },
      {
        displayValue: '성곡동미당',
        value: '200',
      },
      {
        displayValue: '정왕동해남',
        value: '199',
      },
      {
        displayValue: '성곡동평호',
        value: '198',
      },
      {
        displayValue: '정왕동태화',
        value: '197',
      },
      {
        displayValue: '신길동좋은날',
        value: '196',
      },
      {
        displayValue: '정왕동정성',
        value: '195',
      },
      {
        displayValue: '정왕동자연',
        value: '194',
      },
      {
        displayValue: '성곡동웰빙',
        value: '193',
      },
      {
        displayValue: '성곡동와이푸드',
        value: '192',
      },
      {
        displayValue: '정왕동오성',
        value: '191',
      },
      {
        displayValue: '정왕동아이엔',
        value: '190',
      },
      {
        displayValue: '성곡동명가',
        value: '189',
      },
      {
        displayValue: '신길동멋진날',
        value: '188',
      },
      {
        displayValue: '성곡동아이엠',
        value: '187',
      },
      {
        displayValue: '정왕동대영',
        value: '186',
      },
      {
        displayValue: '목내동대덕2',
        value: '185',
      },
      {
        displayValue: '목내동대덕1',
        value: '184',
      },
      {
        displayValue: '정왕동다솔',
        value: '183',
      },
      {
        displayValue: '정왕동남일',
        value: '182',
      },
      {
        displayValue: '정왕동경상',
        value: '181',
      },
      {
        displayValue: '문정동만날',
        value: '180',
      },
      {
        displayValue: '오류동민들레한식부페',
        value: '179',
      },
      {
        displayValue: '청천동청년한식뷔페',
        value: '178',
      },
      {
        displayValue: '호계동에스케이이룸푸드',
        value: '177',
      },
      {
        displayValue: '반포본동세화여자고등학교(해지)',
        value: '176',
      },
      {
        displayValue: '감북동복실이농산',
        value: '175',
      },
      {
        displayValue: '평택시시골집한식부페',
        value: '174',
      },
      {
        displayValue: '이천시행복한식당',
        value: '173',
      },
      {
        displayValue: '정왕동행복한밥상',
        value: '172',
      },
      {
        displayValue: '정왕동천일식당',
        value: '171',
      },
      {
        displayValue: '평택시빅마마한식',
        value: '170',
      },
      {
        displayValue: '정자동휴먼에코푸드정자점',
        value: '169',
      },
      {
        displayValue: '신흥동봄스수라상',
        value: '168',
      },
      {
        displayValue: '호계동푸드웰네오학원점',
        value: '167',
      },
      {
        displayValue: '정왕동정성가득',
        value: '166',
      },
      {
        displayValue: '학익동위드디앤비',
        value: '165',
      },
      {
        displayValue: '양평동베니스에프엔에스',
        value: '164',
      },
      {
        displayValue: '포일동청담한식뷔페',
        value: '163',
      },
      {
        displayValue: '상대원동데일리푸드썬비즈',
        value: '162',
      },
      {
        displayValue: '김포시행복한푸드학운6단지',
        value: '161',
      },
      {
        displayValue: '마곡동덕송알찬한식(CP4)',
        value: '160',
      },
      {
        displayValue: '김포시수림한식부페석탄점',
        value: '159',
      },
      {
        displayValue: '고색동정가네밥상(해지)',
        value: '158',
      },
      {
        displayValue: '김포시산들식당',
        value: '157',
      },
      {
        displayValue: '당정동예향한식부페',
        value: '156',
      },
      {
        displayValue: '상대원동특급식당',
        value: '155',
      },
      {
        displayValue: '경서동호남한식부페',
        value: '154',
      },
      {
        displayValue: '이의동(영통)경기도청신청사',
        value: '153',
      },
      {
        displayValue: '고등동(팔달)경기도청현청사',
        value: '152',
      },
      {
        displayValue: '상대원동만나푸드',
        value: '151',
      },
      {
        displayValue: '상대원동푸드스토리',
        value: '150',
      },
      {
        displayValue: '부곡동안다미로',
        value: '149',
      },
      {
        displayValue: '당정동에스케이벤티움',
        value: '148',
      },
      {
        displayValue: '고색동쿡앤푸드(해지)',
        value: '147',
      },
      {
        displayValue: '정왕동이대표한식부페',
        value: '146',
      },
      {
        displayValue: '정왕동맛고을',
        value: '145',
      },
      {
        displayValue: '김포시한식기사부페',
        value: '144',
      },
      {
        displayValue: '남양주시제이엠푸드',
        value: '143',
      },
      {
        displayValue: '금정동한림이푸드',
        value: '142',
      },
      {
        displayValue: '신림동수성상회푸드웰점',
        value: '141',
      },
      {
        displayValue: '당정동이룸푸드(해지)',
        value: '140',
      },
      {
        displayValue: '계수동맛터셀프부페(해지)',
        value: '139',
      },
      {
        displayValue: '김포시수림한식부페',
        value: '138',
      },
      {
        displayValue: '김포시참존한식부페',
        value: '137',
      },
      {
        displayValue: '흑석동휴먼에코푸드흑석',
        value: '136',
      },
      {
        displayValue: '관양동틈새집밥',
        value: '135',
      },
      {
        displayValue: '정왕동안산식당',
        value: '134',
      },
      {
        displayValue: '고색동나래밥상',
        value: '133',
      },
      {
        displayValue: '교동제이탑푸드',
        value: '132',
      },
      {
        displayValue: '목내동다원식당',
        value: '131',
      },
      {
        displayValue: '오류동아이스트로',
        value: '130',
      },
      {
        displayValue: '고잔동이지푸드',
        value: '129',
      },
      {
        displayValue: '논현동둥지식당',
        value: '128',
      },
      {
        displayValue: '고잔동대지한식부페',
        value: '127',
      },
      {
        displayValue: '정왕동스틸한식부페',
        value: '126',
      },
      {
        displayValue: '김포시선이네한식뷔페',
        value: '125',
      },
      {
        displayValue: '목내동백산한식부페',
        value: '124',
      },
      {
        displayValue: '내동명가한식부페',
        value: '123',
      },
      {
        displayValue: '둔촌동정마루푸드',
        value: '122',
      },
      {
        displayValue: '계수동정마루푸드',
        value: '121',
      },
      {
        displayValue: '원시동선화캐터링',
        value: '120',
      },
      {
        displayValue: '내동큰나무푸드',
        value: '119',
      },
      {
        displayValue: '성남동성일중학교',
        value: '118',
      },
      {
        displayValue: '성곡동호남식당',
        value: '117',
      },
      {
        displayValue: '초이동장흥한식하남점',
        value: '116',
      },
      {
        displayValue: '청천동한샘셀프식당',
        value: '115',
      },
      {
        displayValue: '고색동나이스캐더링(래피젠)',
        value: '114',
      },
      {
        displayValue: '원창동영광한식부페',
        value: '113',
      },
      {
        displayValue: '가좌동토지한식부페',
        value: '112',
      },
      {
        displayValue: '문정동풍경한식뷔페',
        value: '111',
      },
      {
        displayValue: '가좌동명가식당(4호점)',
        value: '110',
      },
      {
        displayValue: '춘궁동급식연구소',
        value: '109',
      },
      {
        displayValue: '정왕동우리푸드',
        value: '108',
      },
      {
        displayValue: '사노동디엔비푸드(해지)',
        value: '107',
      },
      {
        displayValue: '도화동대현기산구내매점',
        value: '106',
      },
      {
        displayValue: '당하동야무진한식부페',
        value: '105',
      },
      {
        displayValue: '동천동원푸드코리아수지점',
        value: '104',
      },
      {
        displayValue: '고잔동제일안전교육사',
        value: '103',
      },
      {
        displayValue: '김포시세종한식뷔페(마녀)',
        value: '102',
      },
      {
        displayValue: '오류동서진한식',
        value: '101',
      },
      {
        displayValue: '도당동(부천)행복한밥상',
        value: '100',
      },
      {
        displayValue: '김포시사계절한식뷔페(해지)',
        value: '99',
      },
      {
        displayValue: '대치동하나에프앤비태성점',
        value: '98',
      },
      {
        displayValue: '개포동지씨에스개포점',
        value: '97',
      },
      {
        displayValue: '흑석동지씨에스흑석점',
        value: '96',
      },
      {
        displayValue: '고잔동본토푸드(디씨제이)',
        value: '95',
      },
      {
        displayValue: '고잔동본토푸드',
        value: '94',
      },
      {
        displayValue: '관양동(주)푸드디자인',
        value: '93',
      },
      {
        displayValue: '호계동미소담푸드',
        value: '92',
      },
      {
        displayValue: '당정동엄마손부페',
        value: '91',
      },
      {
        displayValue: '이의동경기도의회',
        value: '90',
      },
      {
        displayValue: '원시동황금밥상',
        value: '89',
      },
      {
        displayValue: '김포시계절밥상',
        value: '88',
      },
      {
        displayValue: '세교동산들에',
        value: '87',
      },
      {
        displayValue: '남촌동본토푸드(본사)',
        value: '86',
      },
      {
        displayValue: '영덕동아름드리',
        value: '85',
      },
      {
        displayValue: '고잔동(현대화스너)푸드원',
        value: '84',
      },
      {
        displayValue: '상도동본토푸드',
        value: '83',
      },
      {
        displayValue: '오정동오렌지푸드',
        value: '82',
      },
      {
        displayValue: '평택시온정에프엔비',
        value: '81',
      },
      {
        displayValue: '도화동세종푸드',
        value: '80',
      },
      {
        displayValue: '성수동플레이팅성수점',
        value: '79',
      },
      {
        displayValue: '이동우렁각시(해지)',
        value: '78',
      },
      {
        displayValue: '삼동전라도밥상한식뷔페',
        value: '77',
      },
      {
        displayValue: '배양동소울푸드',
        value: '76',
      },
      {
        displayValue: '당정동신라테크푸드',
        value: '75',
      },
      {
        displayValue: '오류동맛깔한식뷔페',
        value: '74',
      },
      {
        displayValue: '구로동다온누리푸드',
        value: '73',
      },
      {
        displayValue: '가산동굿푸드원',
        value: '72',
      },
      {
        displayValue: '김포시행복한푸드',
        value: '71',
      },
      {
        displayValue: '사리현동마미랑푸드',
        value: '70',
      },
      {
        displayValue: '영천동한올푸드시스템',
        value: '69',
      },
      {
        displayValue: '가장동베스트푸드케터링',
        value: '68',
      },
      {
        displayValue: '마북동해정식당',
        value: '67',
      },
      {
        displayValue: '방교동산단한식뷔페',
        value: '66',
      },
      {
        displayValue: '오류동한솔푸드',
        value: '65',
      },
      {
        displayValue: '십정동경인푸드',
        value: '64',
      },
      {
        displayValue: '가좌동주식회사예스영푸드',
        value: '63',
      },
      {
        displayValue: '청라동존쿡푸드',
        value: '62',
      },
      {
        displayValue: '가산동푸드명가',
        value: '61',
      },
      {
        displayValue: '문래동파라다이스',
        value: '60',
      },
      {
        displayValue: '송도동현대3차-진한식당',
        value: '59',
      },
      {
        displayValue: '송도동송도AIT-진한식당',
        value: '58',
      },
      {
        displayValue: '고색동경원푸드',
        value: '57',
      },
      {
        displayValue: '가산동윤셰프갤러리',
        value: '56',
      },
      {
        displayValue: '김포시마녀식당2호점',
        value: '55',
      },
      {
        displayValue: '김포시어가네한식뷔페',
        value: '54',
      },
      {
        displayValue: '중곡동스푸니',
        value: '53',
      },
      {
        displayValue: '성수동우리푸드',
        value: '52',
      },
      {
        displayValue: '송도동엠코-진한식당',
        value: '51',
      },
      {
        displayValue: '송도동진한식당',
        value: '50',
      },
      {
        displayValue: '김포시원영식당',
        value: '49',
      },
      {
        displayValue: '정왕동우리집',
        value: '48',
      },
      {
        displayValue: '정왕동거북섬-집밥',
        value: '47',
      },
      {
        displayValue: '여의도동플레이팅여의도',
        value: '46',
      },
      {
        displayValue: '신길동유진구내식당',
        value: '45',
      },
      {
        displayValue: '영덕동지푸드',
        value: '44',
      },
      {
        displayValue: '학의동장흥한식',
        value: '43',
      },
      {
        displayValue: '김포시주식회사마녀',
        value: '42',
      },
      {
        displayValue: '김포시착한밥상(해지)',
        value: '41',
      },
      {
        displayValue: '가산동오케이푸드',
        value: '40',
      },
      {
        displayValue: '정왕동케이푸드시스템',
        value: '39',
      },
      {
        displayValue: '오정동오렌지푸드(본사)',
        value: '38',
      },
      {
        displayValue: '정왕동사랑채한식뷔페',
        value: '37',
      },
      {
        displayValue: '문래동데일리푸드2',
        value: '36',
      },
      {
        displayValue: '김포시나이스캐더링',
        value: '35',
      },
      {
        displayValue: '원당동지씨에스검단점',
        value: '34',
      },
      {
        displayValue: '왕길동N_FOOD',
        value: '33',
      },
      {
        displayValue: '고색동밥뜨랑',
        value: '32',
      },
      {
        displayValue: '항동CPF&B',
        value: '31',
      },
      {
        displayValue: '거모동홈푸드케터링',
        value: '30',
      },
      {
        displayValue: '김포시봄푸드서비스',
        value: '29',
      },
      {
        displayValue: '배곧동미소셀프한식뷔페',
        value: '28',
      },
      {
        displayValue: '당동푸드윈3',
        value: '27',
      },
      {
        displayValue: '송도동지씨에스송도점',
        value: '26',
      },
      {
        displayValue: '잠원동리빙푸드',
        value: '25',
      },
      {
        displayValue: '용인시세종케터링',
        value: '24',
      },
      {
        displayValue: '오류동더쿠킹스토리검단3호점',
        value: '23',
      },
      {
        displayValue: '오류동더쿠킹스토리검단2호점',
        value: '22',
      },
      {
        displayValue: '오류동더쿠킹스토리검단점(해지)',
        value: '21',
      },
      {
        displayValue: '양평동파인쿡목동',
        value: '20',
      },
      {
        displayValue: '서초동서초구청',
        value: '19',
      },
      {
        displayValue: '둔촌동강동푸드원(해지)',
        value: '18',
      },
      {
        displayValue: '풍산동더쿠킹스토리미사점',
        value: '17',
      },
      {
        displayValue: '문정동더쿠킹스토리문정점',
        value: '16',
      },
      {
        displayValue: '김포시개곡초등학교',
        value: '15',
      },
      {
        displayValue: '가산동윤스푸드',
        value: '14',
      },
      {
        displayValue: '가산동집밥구내식당',
        value: '13',
      },
      {
        displayValue: '가산동태세라한식(해지)',
        value: '12',
      },
      {
        displayValue: '송도동휴먼에코푸드송도점',
        value: '11',
      },
      {
        displayValue: '창우동해피락하남',
        value: '10',
      },
      {
        displayValue: '백석동해피락인천',
        value: '9',
      },
      {
        displayValue: '당동푸드윈2',
        value: '8',
      },
      {
        displayValue: '당동푸드윈_군포',
        value: '7',
      },
      {
        displayValue: '염창동푸드윈서울',
        value: '6',
      },
      {
        displayValue: '당동푸드윈_하이푸드',
        value: '5',
      },
      {
        displayValue: '화성시송산리휴먼에코푸드',
        value: '4',
      },
      {
        displayValue: '호매실동오늘반찬',
        value: '3',
      },
      {
        displayValue: '반정동진샘',
        value: '2',
      },
      {
        displayValue: '논현동플레이팅',
        value: '1',
      },
      {
        displayValue: '돈암동행복한해오름어린이집',
        value: '7662',
      },
      {
        displayValue: '개포동연세중앙어린이집',
        value: '7599',
      },
      {
        displayValue: '산곡동수자인꿈모아어린이집',
        value: '7598',
      },
      {
        displayValue: '김포시꿈틀어린이집',
        value: '7597',
      },
      {
        displayValue: '남양주시VIP푸드',
        value: '7596',
      },
      {
        displayValue: '철산동도덕초등학교병설유치원',
        value: '7595',
      },
      {
        displayValue: '공덕동공덕삼성어린이집',
        value: '7594',
      },
      {
        displayValue: '신천동딩동댕장미어린이집',
        value: '7593',
      },
      {
        displayValue: '옥정동라온어린이집',
        value: '7576',
      },
      {
        displayValue: '부평동해링턴키즈어린이집',
        value: '7575',
      },
      {
        displayValue: '반월동그린어린이집',
        value: '7540',
      },
      {
        displayValue: '월곶동센트럴헤센어린이집',
        value: '7539',
      },
      {
        displayValue: '화성시장안어린이집',
        value: '7538',
      },
      {
        displayValue: '반월동뿌뿌어린이집',
        value: '7537',
      },
      {
        displayValue: '신월동홍익어린이집',
        value: '7470',
      },
      {
        displayValue: '일산동열린키즈어린이집',
        value: '7469',
      },
      {
        displayValue: '신월동파란들어린이집',
        value: '7453',
      },
      {
        displayValue: '동천동엄마품어린이집',
        value: '7452',
      },
      {
        displayValue: '대신동블루밍인터내셔널스콜라스',
        value: '7451',
      },
      {
        displayValue: '고덕동슬기로운어린이집',
        value: '7435',
      },
      {
        displayValue: '내삼미동트니트니숲어린이집',
        value: '7419',
      },
      {
        displayValue: '불로동아라꽃어린이집',
        value: '7387',
      },
      {
        displayValue: '원당동푸르지오창의나무어린이집',
        value: '7319',
      },
      {
        displayValue: '김포시시립별하어린이집',
        value: '7318',
      },
      {
        displayValue: '북아현동아이뜰어린이집',
        value: '7317',
      },
      {
        displayValue: '쌍문동해피모아어린이집',
        value: '7316',
      },
      {
        displayValue: '주교동꿈을키우는어린이집',
        value: '7315',
      },
      {
        displayValue: '신천동주식회사에프피디글로벌',
        value: '7314',
      },
      {
        displayValue: '후암동복자유치원',
        value: '7282',
      },
      {
        displayValue: '상도동반찬투정',
        value: '7250',
      },
      {
        displayValue: '부개동리틀월드어린이집',
        value: '7249',
      },
      {
        displayValue: '연남동근로복지공단마포어린이집',
        value: '7248',
      },
      {
        displayValue: '내삼미동아이조아어린이집',
        value: '7216',
      },
      {
        displayValue: '김포시아띠어린이집',
        value: '7183',
      },
      {
        displayValue: '송도동베르디움어린이집',
        value: '7182',
      },
      {
        displayValue: '향동동꽃마을어린이집',
        value: '7163',
      },
      {
        displayValue: '불로동힐스맘어린이집',
        value: '7162',
      },
      {
        displayValue: '사동모아맘어린이집',
        value: '7161',
      },
      {
        displayValue: '목동향기나무어린이집',
        value: '7160',
      },
      {
        displayValue: '방이동우아한어린이집',
        value: '7125',
      },
      {
        displayValue: '방이동우아한2어린이집',
        value: '7124',
      },
      {
        displayValue: '상일동아이재미어린이집',
        value: '7123',
      },
      {
        displayValue: '용인시시립솔빛어린이집',
        value: '7122',
      },
      {
        displayValue: '하동리틀초록어린이집',
        value: '7121',
      },
      {
        displayValue: '초지동해솔어린이집',
        value: '7120',
      },
      {
        displayValue: '역북동신성아이맘어린이집',
        value: '7119',
      },
      {
        displayValue: '산곡동이든어린이집',
        value: '7118',
      },
      {
        displayValue: '금정동하하어린이집',
        value: '7117',
      },
      {
        displayValue: '신사동광림어린이집',
        value: '7116',
      },
      {
        displayValue: '신월동아람어린이집',
        value: '7115',
      },
      {
        displayValue: '보정동엄마맘어린이집',
        value: '7114',
      },
      {
        displayValue: '송도동아이누리어린이집',
        value: '7051',
      },
      {
        displayValue: '불로동풍경채하랑어린이집',
        value: '7050',
      },
      {
        displayValue: '신정동다사랑어린이집',
        value: '7049',
      },
      {
        displayValue: '홍지동세검정유치원',
        value: '7048',
      },
      {
        displayValue: '탄현동테디어린이집',
        value: '7047',
      },
      {
        displayValue: '인창동이레어린이집',
        value: '7046',
      },
      {
        displayValue: '목동아가꿈어린이집',
        value: '7045',
      },
      {
        displayValue: '금호동엄마맘어린이집',
        value: '6997',
      },
      {
        displayValue: '상현동더샵아이좋아어린이집',
        value: '6996',
      },
      {
        displayValue: '영등포동웰라이어린이집',
        value: '6995',
      },
      {
        displayValue: '목동세화어린이집',
        value: '6994',
      },
      {
        displayValue: '신정동세꿈어린이집',
        value: '6993',
      },
      {
        displayValue: '화정동스마트튼튼어린이집',
        value: '6992',
      },
      {
        displayValue: '망월동사랑숲어린이집',
        value: '6991',
      },
      {
        displayValue: '동패동시립하늘빛어린이집',
        value: '6990',
      },
      {
        displayValue: '거여동롯데캐슬아이어린이집',
        value: '6989',
      },
      {
        displayValue: '효성동파란나라어린이집',
        value: '6988',
      },
      {
        displayValue: '목동해나리어린이집',
        value: '6987',
      },
      {
        displayValue: '장안동브레인에듀어린이집',
        value: '6986',
      },
      {
        displayValue: '논현동그린나래어린이집',
        value: '6985',
      },
      {
        displayValue: '대장동꿀단지어린이집',
        value: '6984',
      },
      {
        displayValue: '장지동푸르지오그린어린이집',
        value: '6963',
      },
      {
        displayValue: '목동이화키즈어린이집',
        value: '6962',
      },
      {
        displayValue: '창신동아이소리어린이집',
        value: '6961',
      },
      {
        displayValue: '죽전동아이꿈터어린이집',
        value: '6960',
      },
      {
        displayValue: '목동사랑별어린이집',
        value: '6959',
      },
      {
        displayValue: '목동누리어린이집',
        value: '6958',
      },
      {
        displayValue: '이태원동서머힐어린이집',
        value: '6957',
      },
      {
        displayValue: '광장동파크빌어린이집',
        value: '6956',
      },
      {
        displayValue: '신정동한가람어린이집',
        value: '6955',
      },
      {
        displayValue: '목동토마토어린이집',
        value: '6954',
      },
      {
        displayValue: '이태원동리아어학원',
        value: '6953',
      },
      {
        displayValue: '목동도만스쿨어린이집',
        value: '6952',
      },
      {
        displayValue: '천천동하늘나무어린이집',
        value: '6951',
      },
      {
        displayValue: '신월동신월은혜어린이집',
        value: '6950',
      },
      {
        displayValue: '둔촌동길동새순어린이집',
        value: '6949',
      },
      {
        displayValue: '상계동사랑샘오감어린이집',
        value: '6948',
      },
      {
        displayValue: '구산동숲속키즈나라어린이집',
        value: '6947',
      },
      {
        displayValue: '부평동한솔키즈랜드어린이집',
        value: '6946',
      },
      {
        displayValue: '장지동도유어린이집',
        value: '6925',
      },
      {
        displayValue: '갈매동마음이어린이집',
        value: '6924',
      },
      {
        displayValue: '사당동하람어린이집',
        value: '6923',
      },
      {
        displayValue: '남양주시보미청광어린이집',
        value: '6922',
      },
      {
        displayValue: '용인시토토리어린이집',
        value: '6921',
      },
      {
        displayValue: '옥수동한울어린이집',
        value: '6920',
      },
      {
        displayValue: '노량진동늘푸른어린이집',
        value: '6919',
      },
      {
        displayValue: '화성시힐스내리큰꿈어린이집',
        value: '6918',
      },
      {
        displayValue: '신곡동파밀리에어린이집',
        value: '6917',
      },
      {
        displayValue: '신림동포그니어린이집',
        value: '6916',
      },
      {
        displayValue: '석촌동빙고어린이집',
        value: '6882',
      },
      {
        displayValue: '김량장동어울림몬테소리어린이집',
        value: '6881',
      },
      {
        displayValue: '신정동구립엄마품어린이집',
        value: '6880',
      },
      {
        displayValue: '정릉동예쁜어린이집',
        value: '6879',
      },
      {
        displayValue: '마산동주빌리어린이집',
        value: '6878',
      },
      {
        displayValue: '동패동교하다솜어린이집',
        value: '6842',
      },
      {
        displayValue: '논현동나무향기어린이집',
        value: '6841',
      },
      {
        displayValue: '도곡동더아이노블강남본원어학원',
        value: '6840',
      },
      {
        displayValue: '고암동중흥어린이집',
        value: '6839',
      },
      {
        displayValue: '송도동키즈랜드어린이집',
        value: '6838',
      },
      {
        displayValue: '남양주시해태둥지어린이집',
        value: '6837',
      },
      {
        displayValue: '부평동두레어린이집',
        value: '6836',
      },
      {
        displayValue: '태전동채송화어린이집',
        value: '6835',
      },
      {
        displayValue: '반송동숲속미루어린이집',
        value: '6834',
      },
      {
        displayValue: '목동키드윈아트어린이집',
        value: '6833',
      },
      {
        displayValue: '중산동딩동댕키즈어린이집',
        value: '6832',
      },
      {
        displayValue: '망월동레몬트리어린이집',
        value: '6813',
      },
      {
        displayValue: '풍무동고운맘어린이집',
        value: '6812',
      },
      {
        displayValue: '오금동라피아노어린이집',
        value: '6811',
      },
      {
        displayValue: '동천동HABAfamily신명어린이집',
        value: '6810',
      },
      {
        displayValue: '위례알티오라',
        value: '6725',
      },
      {
        displayValue: '강동폴리',
        value: '6724',
      },
      {
        displayValue: '송파알티오라',
        value: '6723',
      },
      {
        displayValue: '과천라이즈',
        value: '6722',
      },
      {
        displayValue: '홍제동인왕초병설유치원',
        value: '6721',
      },
      {
        displayValue: '거여동거원초병설유치원',
        value: '6720',
      },
      {
        displayValue: '응암동응암초병설유치원',
        value: '6719',
      },
      {
        displayValue: '운양동창조어린이집',
        value: '6718',
      },
      {
        displayValue: '광명동예림어린이집',
        value: '6717',
      },
      {
        displayValue: '역삼동강남센트럴어린이집',
        value: '6716',
      },
      {
        displayValue: '토당동꿈의정원어린이집',
        value: '6715',
      },
      {
        displayValue: '내발산동마곡사임당어린이집',
        value: '6714',
      },
      {
        displayValue: '가좌동드림어린이집',
        value: '6713',
      },
      {
        displayValue: '일산동사랑샘어린이집',
        value: '6712',
      },
      {
        displayValue: '용인시키즈라라어린이집',
        value: '6711',
      },
      {
        displayValue: '당하동두손어린이집',
        value: '6710',
      },
      {
        displayValue: '금곡동강남푸른하늘어린이집',
        value: '6709',
      },
      {
        displayValue: '대치동보람어린이집',
        value: '6708',
      },
      {
        displayValue: '신장동시립꿈이든어린이집',
        value: '6707',
      },
      {
        displayValue: '풍동시립숲속아이어린이집',
        value: '6706',
      },
      {
        displayValue: '운양동아기대통령어린이집',
        value: '6705',
      },
      {
        displayValue: '보라동베이비텔어린이집',
        value: '6704',
      },
      {
        displayValue: '부평동꿈나무유치원',
        value: '6703',
      },
      {
        displayValue: '상일동자이숲어린이집',
        value: '6702',
      },
      {
        displayValue: '부개동부개1동어린이집',
        value: '6701',
      },
      {
        displayValue: '장기동호반꼬마숲어린이집',
        value: '6700',
      },
      {
        displayValue: '배곧동서울대늘푸른어린이집',
        value: '6699',
      },
      {
        displayValue: '상암동사랑숲어린이집',
        value: '6698',
      },
      {
        displayValue: '가정동사랑나무어린이집',
        value: '6697',
      },
      {
        displayValue: '호평동아이편한어린이집',
        value: '6696',
      },
      {
        displayValue: '철산동해나어린이집',
        value: '6695',
      },
      {
        displayValue: '동춘동다솔어린이집',
        value: '6694',
      },
      {
        displayValue: '장항동미소아이어린이집',
        value: '6693',
      },
      {
        displayValue: '정왕동시립정왕2동어린이집',
        value: '6692',
      },
      {
        displayValue: '서정동더샵아이뜰어린이집',
        value: '6691',
      },
      {
        displayValue: '성내동하늘보라어린이집',
        value: '6690',
      },
      {
        displayValue: '용인시시립백암어린이집',
        value: '6689',
      },
      {
        displayValue: '도내동밝은빛어린이집',
        value: '6688',
      },
      {
        displayValue: '염창동공간어린이집',
        value: '6687',
      },
      {
        displayValue: '둔촌동파크포레온키즈어린이집',
        value: '6686',
      },
      {
        displayValue: '다산동다산강산어린이집',
        value: '6685',
      },
      {
        displayValue: '백석동두산파랑새어린이집',
        value: '6684',
      },
      {
        displayValue: '송도동그린애비뉴어린이집',
        value: '6646',
      },
      {
        displayValue: '의정부동햇살가득어린이집',
        value: '6645',
      },
      {
        displayValue: '화성시사회복지법인정남어린이집',
        value: '6644',
      },
      {
        displayValue: '신갈동빛그린어린이집',
        value: '6643',
      },
      {
        displayValue: '운양동반디어린이집',
        value: '6642',
      },
      {
        displayValue: '수유동나나어린이집',
        value: '6641',
      },
      {
        displayValue: '죽전동죽전나나어린이집',
        value: '6640',
      },
      {
        displayValue: '반송동좋은씨앗어린이집',
        value: '6639',
      },
      {
        displayValue: '송도동생명나무어린이집',
        value: '6638',
      },
      {
        displayValue: '풍무동리온어린이집',
        value: '6637',
      },
      {
        displayValue: '송도동더샵센시티어린이집',
        value: '6636',
      },
      {
        displayValue: '백석동와이시티어린이집',
        value: '6635',
      },
      {
        displayValue: '용인시새빛어린이집',
        value: '6634',
      },
      {
        displayValue: '주엽동동신어린이집',
        value: '6633',
      },
      {
        displayValue: '잠실동예꼬키즈어린이집',
        value: '6632',
      },
      {
        displayValue: '원당동우리아이어린이집',
        value: '6631',
      },
      {
        displayValue: '지축동나라어린이집',
        value: '6630',
      },
      {
        displayValue: '용인시시립원삼어린이집',
        value: '6629',
      },
      {
        displayValue: '금촌2동크니크니어린이집',
        value: '6628',
      },
      {
        displayValue: '오금동마루별어린이집',
        value: '6627',
      },
      {
        displayValue: '망포동예안그대가어린이집',
        value: '6626',
      },
      {
        displayValue: '부평4동The큰빛유치원',
        value: '6625',
      },
      {
        displayValue: '탄현동제니스유치원',
        value: '6624',
      },
      {
        displayValue: '김포시캐파하늘빛어린이집',
        value: '6623',
      },
      {
        displayValue: '원당동국공립아라예미지예빛어린이집',
        value: '6622',
      },
      {
        displayValue: '하안동다영어린이집',
        value: '6621',
      },
      {
        displayValue: '비전동효성반디어린이집',
        value: '6620',
      },
      {
        displayValue: '용이동비전푸르지오어린이집',
        value: '6619',
      },
      {
        displayValue: '용인시시립물빛어린이집',
        value: '6618',
      },
      {
        displayValue: '풍동풍동햇살어린이집',
        value: '6617',
      },
      {
        displayValue: '원당동검단그루터기어린이집',
        value: '6616',
      },
      {
        displayValue: '도원동새랑꿈이랑어린이집',
        value: '6615',
      },
      {
        displayValue: '백석동애플키즈어린이집',
        value: '6614',
      },
      {
        displayValue: '이촌동원유치원',
        value: '6613',
      },
      {
        displayValue: '가정동국공립루원SK2꿈가득어린이집',
        value: '6612',
      },
      {
        displayValue: '신월동구립즐거운어린이집',
        value: '6611',
      },
      {
        displayValue: '동패동해나라어린이집',
        value: '6610',
      },
      {
        displayValue: '송도동꼬마나무어린이집',
        value: '6609',
      },
      {
        displayValue: '배곧동하나키즈어린이집',
        value: '6608',
      },
      {
        displayValue: '조남동해누리어린이집',
        value: '6607',
      },
      {
        displayValue: '삼숭동천사어린이집',
        value: '6606',
      },
      {
        displayValue: '운양동롯데키즈스토리어린이집',
        value: '6605',
      },
      {
        displayValue: '전농1동애플키즈어린이집',
        value: '6604',
      },
      {
        displayValue: '원천동키아광교코리아헤럴드국제어학원',
        value: '6603',
      },
      {
        displayValue: '풍무동온새미로어린이집',
        value: '6602',
      },
      {
        displayValue: '신길동꼬마대통령어린이집',
        value: '6601',
      },
      {
        displayValue: '장항동꽃별어린이집',
        value: '6600',
      },
      {
        displayValue: '일산동아이마루어린이집',
        value: '6599',
      },
      {
        displayValue: '풍무동주닮어린이집',
        value: '6598',
      },
      {
        displayValue: '풍무동푸르지오큰나무어린이집',
        value: '6597',
      },
      {
        displayValue: '화성시봉담아이원어린이집',
        value: '6596',
      },
      {
        displayValue: '목동꼬마해림어린이집',
        value: '6595',
      },
      {
        displayValue: '안녕동우방좋은어린이집',
        value: '6594',
      },
      {
        displayValue: '용인시성민초등학교',
        value: '6593',
      },
      {
        displayValue: '흑석동명수유치원',
        value: '6592',
      },
      {
        displayValue: '송도동라라어린이집',
        value: '6591',
      },
      {
        displayValue: '상갈동사랑어린이집',
        value: '6590',
      },
      {
        displayValue: '도원동도원유치원',
        value: '6573',
      },
      {
        displayValue: '중동딩동댕어린이집',
        value: '6572',
      },
      {
        displayValue: '방배동서초구립도구머리어린이집',
        value: '6571',
      },
      {
        displayValue: '화성시남양6단지어린이집',
        value: '6570',
      },
      {
        displayValue: '원당동하늘빛어린이집',
        value: '6569',
      },
      {
        displayValue: '이의동래미안어린이집',
        value: '6568',
      },
      {
        displayValue: '천호동하임어린이집',
        value: '6558',
      },
      {
        displayValue: '장곡동숲속마을어린이집',
        value: '6557',
      },
      {
        displayValue: '부산동자이사랑어린이집',
        value: '6556',
      },
      {
        displayValue: '이촌동즐거운어린이집',
        value: '6555',
      },
      {
        displayValue: '배곧동골드어린이집',
        value: '6554',
      },
      {
        displayValue: '주엽동숲소리어린이집',
        value: '6553',
      },
      {
        displayValue: '대화동벽산키즈어린이집',
        value: '6552',
      },
      {
        displayValue: '검산동꿀벌어린이집',
        value: '6551',
      },
      {
        displayValue: '덕이동동문아름다운어린이집',
        value: '6550',
      },
      {
        displayValue: '안양동수선화어린이집',
        value: '6549',
      },
      {
        displayValue: '대야동다우리어린이집',
        value: '6548',
      },
      {
        displayValue: '가락동사과나무어린이집',
        value: '6547',
      },
      {
        displayValue: '수유동솔로몬영재어린이집',
        value: '6546',
      },
      {
        displayValue: '옥정동통통어린이집',
        value: '6545',
      },
      {
        displayValue: '매탄동미키미니어린이집',
        value: '6544',
      },
      {
        displayValue: '반송동우림아가별어린이집',
        value: '6543',
      },
      {
        displayValue: '불로동고운별어린이집',
        value: '6542',
      },
      {
        displayValue: '가정동아름별어린이집',
        value: '6541',
      },
      {
        displayValue: '산현동사랑꽃어린이집',
        value: '6540',
      },
      {
        displayValue: '신봉동수지예사랑어린이집',
        value: '6539',
      },
      {
        displayValue: '홍제동현대숲어린이집',
        value: '6538',
      },
      {
        displayValue: '원당동담비어린이집',
        value: '6537',
      },
      {
        displayValue: '천호동상미어린이집',
        value: '6497',
      },
      {
        displayValue: '장곡동동그라미어린이집',
        value: '6496',
      },
      {
        displayValue: '용인시시립달빛어린이집',
        value: '6495',
      },
      {
        displayValue: '산곡동공립고산마루어린이집',
        value: '6494',
      },
      {
        displayValue: '장곡동아름샘어린이집',
        value: '6493',
      },
      {
        displayValue: '서현동쥬쥬어린이집',
        value: '6492',
      },
      {
        displayValue: '화성시양지샤론어린이집',
        value: '6491',
      },
      {
        displayValue: '가락동고려서머힐어린이집',
        value: '6490',
      },
      {
        displayValue: '김포시시립햇살어린이집',
        value: '6488',
      },
      {
        displayValue: '암사동암사신현대어린이집',
        value: '6480',
      },
      {
        displayValue: '내발산동해사랑어린이집',
        value: '6441',
      },
      {
        displayValue: '내곡동양지1어린이집',
        value: '6440',
      },
      {
        displayValue: '내곡동양지2어린이집',
        value: '6439',
      },
      {
        displayValue: '우만동시립우만2동어린이집',
        value: '6438',
      },
      {
        displayValue: '덕계동선재꼬마어린이집',
        value: '6437',
      },
      {
        displayValue: '김포시하늘꿈어린이집',
        value: '6436',
      },
      {
        displayValue: '반송동종이나라몬테소리어린이집',
        value: '6435',
      },
      {
        displayValue: '금정동꿈사랑어린이집',
        value: '6434',
      },
      {
        displayValue: '능동리틀포레어린이집',
        value: '6401',
      },
      {
        displayValue: '고암동라임어린이집',
        value: '6400',
      },
      {
        displayValue: '삼평동아리솔유치원',
        value: '6399',
      },
      {
        displayValue: '풍무동푸르지오사랑어린이집',
        value: '6398',
      },
      {
        displayValue: '등촌동레지오아카데미학원',
        value: '6397',
      },
      {
        displayValue: '송파랜퍼스',
        value: '6396',
      },
      {
        displayValue: '덕계동사랑샘어린이집',
        value: '6387',
      },
      {
        displayValue: '김포시시립엘리움어린이집',
        value: '6386',
      },
      {
        displayValue: '능동애플트리어린이집',
        value: '6369',
      },
      {
        displayValue: '동삭동하람아이어린이집',
        value: '6368',
      },
      {
        displayValue: '등촌동행복도시락3712',
        value: '6367',
      },
      {
        displayValue: '창동창문어린이집',
        value: '6366',
      },
      {
        displayValue: '왕길동리틀하임어린이집',
        value: '6365',
      },
      {
        displayValue: '장안동우리동네키움센터8호점',
        value: '6364',
      },
      {
        displayValue: '둔촌동구립포레온라별어린이집',
        value: '6311',
      },
      {
        displayValue: '가산동호반푸드',
        value: '6310',
      },
      {
        displayValue: '둔촌동구립포레온다솜어린이집',
        value: '6309',
      },
      {
        displayValue: '반포동서초구립아크로별어린이집',
        value: '6308',
      },
      {
        displayValue: '둔촌동구립포레온나율어린이집',
        value: '6307',
      },
      {
        displayValue: '화성시자이프라이드시티어린이집',
        value: '6288',
      },
      {
        displayValue: '둔촌동구립포레온가온어린이집',
        value: '6287',
      },
      {
        displayValue: '둔촌동구립포레온마음어린이집',
        value: '6286',
      },
      {
        displayValue: '원종동백조유치원',
        value: '6285',
      },
      {
        displayValue: '개봉동샛별유치원',
        value: '6269',
      },
      {
        displayValue: '성산동모아어린이집',
        value: '6260',
      },
      {
        displayValue: '인창동시립인창칸타빌어린이집',
        value: '6259',
      },
      {
        displayValue: '가락동이로운어린이집',
        value: '6239',
      },
      {
        displayValue: '가락동참사랑서밋어린이집',
        value: '6238',
      },
      {
        displayValue: '세곡동키즈랜드어린이집',
        value: '6229',
      },
      {
        displayValue: '신길동코끼리어린이집',
        value: '6228',
      },
      {
        displayValue: '신당동약수교회어린이집',
        value: '6195',
      },
      {
        displayValue: '신천동왕자와공주어린이집',
        value: '6194',
      },
      {
        displayValue: '목동러닝포레스트',
        value: '6178',
      },
      {
        displayValue: '구로동단비어린이집',
        value: '6167',
      },
      {
        displayValue: '김포시아이친구어린이집',
        value: '5881',
      },
      {
        displayValue: '당하동한내들하나어린이집',
        value: '5880',
      },
      {
        displayValue: '별내동행복가득어린이집',
        value: '5879',
      },
      {
        displayValue: '망월동미사새싹어린이집',
        value: '5878',
      },
      {
        displayValue: '당하동예미지아라어린이집',
        value: '5877',
      },
      {
        displayValue: '화성시우리천사어린이집',
        value: '5876',
      },
      {
        displayValue: '돈암동아랑유치원',
        value: '5875',
      },
      {
        displayValue: '청천동신나는어린이집',
        value: '5874',
      },
      {
        displayValue: '정왕동새아름어린이집',
        value: '5873',
      },
      {
        displayValue: '상동두리몬테소리어린이집',
        value: '5872',
      },
      {
        displayValue: '신정동예뜰어린이집',
        value: '5871',
      },
      {
        displayValue: '화성시신안아이슐레어린이집',
        value: '5870',
      },
      {
        displayValue: '청라동예일어린이집',
        value: '5869',
      },
      {
        displayValue: '감이동고운별어린이집',
        value: '5868',
      },
      {
        displayValue: '풍산동아기코끼리어린이집',
        value: '5867',
      },
      {
        displayValue: '청담동청담몬테소리유치원',
        value: '5866',
      },
      {
        displayValue: '세교동아이들천국어린이집',
        value: '5865',
      },
      {
        displayValue: '세교동아이들천국유치원',
        value: '5864',
      },
      {
        displayValue: '반송동솔빛몬테소리어린이집',
        value: '5863',
      },
      {
        displayValue: '내손동맑은샘어린이집',
        value: '5862',
      },
      {
        displayValue: '하안동풀꽃어린이집',
        value: '5861',
      },
      {
        displayValue: '백석동한들자연숲어린이집',
        value: '5860',
      },
      {
        displayValue: '조남동한신예다솜어린이집',
        value: '5859',
      },
      {
        displayValue: '대야동흰백합몬테소리어린이집',
        value: '5858',
      },
      {
        displayValue: '영덕동효성테라스어린이집',
        value: '5857',
      },
      {
        displayValue: '선동웃는아이어린이집',
        value: '5856',
      },
      {
        displayValue: '간석동아침빛어린이집',
        value: '5855',
      },
      {
        displayValue: '옥정동공립늘푸른풍경채어린이집',
        value: '5854',
      },
      {
        displayValue: '평촌동해와달어린이집',
        value: '5853',
      },
      {
        displayValue: '다산동빛가람어린이집',
        value: '5852',
      },
      {
        displayValue: '청라동꽃뜰어린이집',
        value: '5851',
      },
      {
        displayValue: '중산동예쁜어린이집',
        value: '5850',
      },
      {
        displayValue: '필운동배화유치원',
        value: '5849',
      },
      {
        displayValue: '고양동신임마누엘어린이집',
        value: '5848',
      },
      {
        displayValue: '운양동차일드빅스맘어린이집',
        value: '5847',
      },
      {
        displayValue: '장지동올리브어린이집',
        value: '5846',
      },
      {
        displayValue: '논현동새희망어린이집',
        value: '5845',
      },
      {
        displayValue: '오산동알티오라어학원동탄2캠퍼스',
        value: '5844',
      },
      {
        displayValue: '산현동헬렌도론',
        value: '5843',
      },
      {
        displayValue: '송도동(주)글로벌빌리지',
        value: '5842',
      },
      {
        displayValue: '청라동라무스어학원',
        value: '5841',
      },
      {
        displayValue: '북변동김포ecc',
        value: '5840',
      },
      {
        displayValue: '자양동광진어린이집',
        value: '5839',
      },
      {
        displayValue: '호원동작은동화어린이집',
        value: '5838',
      },
      {
        displayValue: '호원동짱아어린이집',
        value: '5837',
      },
      {
        displayValue: '운양동맘속어린이집',
        value: '5836',
      },
      {
        displayValue: '주엽동토이어린이집',
        value: '5835',
      },
      {
        displayValue: '은행동시흥패스트랙키즈어학원',
        value: '5834',
      },
      {
        displayValue: '서초동서초구립서초4동써밋2어린이집',
        value: '5833',
      },
      {
        displayValue: '구의동구의2동어린이집',
        value: '5832',
      },
      {
        displayValue: '성내동오륜어린이집',
        value: '5831',
      },
      {
        displayValue: '영덕동시립기흥효성어린이집',
        value: '5830',
      },
      {
        displayValue: '증산동새롬어린이집',
        value: '5829',
      },
      {
        displayValue: '번동꿈의어린이집',
        value: '5828',
      },
      {
        displayValue: '소하동꿈꾸는어린이집',
        value: '5827',
      },
      {
        displayValue: '중동예랑어린이집',
        value: '5826',
      },
      {
        displayValue: '목동빛나라어린이집',
        value: '5825',
      },
      {
        displayValue: '송도동미소천사어린이집',
        value: '5824',
      },
      {
        displayValue: '목동예원아트어린이집',
        value: '5823',
      },
      {
        displayValue: '부평동꿈나무새싹어린이집',
        value: '5822',
      },
      {
        displayValue: '상현동광교상록어린이집',
        value: '5821',
      },
      {
        displayValue: '소하동뮤직아이어린이집',
        value: '5820',
      },
      {
        displayValue: '정왕동신나는자연어린이집',
        value: '5819',
      },
      {
        displayValue: '포천시은혜아이어린이집',
        value: '5818',
      },
      {
        displayValue: '정왕동예은건영어린이집',
        value: '5817',
      },
      {
        displayValue: '장항동아이비어린이집',
        value: '5816',
      },
      {
        displayValue: '소사본동소사햇살어린이집',
        value: '5815',
      },
      {
        displayValue: '야탑동도레미유치원',
        value: '5814',
      },
      {
        displayValue: '상동새봄어린이집',
        value: '5813',
      },
      {
        displayValue: '장지동위례봄어린이집',
        value: '5812',
      },
      {
        displayValue: '망월동예은어린이집',
        value: '5811',
      },
      {
        displayValue: '소사본동해나라어린이집',
        value: '5810',
      },
      {
        displayValue: '능곡동밝은미래어린이집',
        value: '5809',
      },
      {
        displayValue: '신사동신사홍익어린이집',
        value: '5808',
      },
      {
        displayValue: '원미동풍림행복한어린이집',
        value: '5807',
      },
      {
        displayValue: '기산동펀키즈어린이집',
        value: '5806',
      },
      {
        displayValue: '세교동시립아이행복어린이집',
        value: '5805',
      },
      {
        displayValue: '풍납동현대유치원',
        value: '5804',
      },
      {
        displayValue: '풍무동푸르지오맘사랑어린이집',
        value: '5803',
      },
      {
        displayValue: '백현동판교이든아이어린이집',
        value: '5802',
      },
      {
        displayValue: '신도림동꿈초롱어린이집',
        value: '5801',
      },
      {
        displayValue: '미아동비테에어린이집',
        value: '5800',
      },
      {
        displayValue: '평촌동샬롬어린이집',
        value: '5799',
      },
      {
        displayValue: '정자동다온어린이집',
        value: '5798',
      },
      {
        displayValue: '선화동예뜰어린이집',
        value: '5797',
      },
      {
        displayValue: '신당동한일유치원',
        value: '5796',
      },
      {
        displayValue: '전농동예일유치원',
        value: '5795',
      },
      {
        displayValue: '성포동예술인유치원',
        value: '5794',
      },
      {
        displayValue: '우만동예닮어린이집',
        value: '5793',
      },
      {
        displayValue: '천천동헤세드어린이집',
        value: '5792',
      },
      {
        displayValue: '정자동비발디어린이집',
        value: '5791',
      },
      {
        displayValue: '금곡동호반센트럴어린이집',
        value: '5790',
      },
      {
        displayValue: '권선동새영재어린이집',
        value: '5789',
      },
      {
        displayValue: '운양동스위첸빅스맘어린이집',
        value: '5788',
      },
      {
        displayValue: '여월동세상의중심가온어린이집',
        value: '5787',
      },
      {
        displayValue: '길동에덴어린이집',
        value: '5786',
      },
      {
        displayValue: '길동큰별어린이집',
        value: '5785',
      },
      {
        displayValue: '망월동윤슬어린이집',
        value: '5784',
      },
      {
        displayValue: '상대원동아하키즈어린이집',
        value: '5783',
      },
      {
        displayValue: '신월동꼬마숲상아아름어린이집',
        value: '5782',
      },
      {
        displayValue: '방이동아이큰숲어린이집',
        value: '5781',
      },
      {
        displayValue: '일산동위드빅스맘어린이집',
        value: '5780',
      },
      {
        displayValue: '파주시예능어린이집',
        value: '5779',
      },
      {
        displayValue: '소하동아이슐레광명원',
        value: '5778',
      },
      {
        displayValue: '정릉동올리성북원',
        value: '5777',
      },
      {
        displayValue: '보문동신중앙어린이집',
        value: '5776',
      },
      {
        displayValue: '묵동미림유치원',
        value: '5775',
      },
      {
        displayValue: '범박동소사참사랑어린이집',
        value: '5774',
      },
      {
        displayValue: '작동성곡예일어린이집',
        value: '5773',
      },
      {
        displayValue: '내동맑은샘어린이집',
        value: '5772',
      },
      {
        displayValue: '일원동아이트라움어린이집',
        value: '5771',
      },
      {
        displayValue: '창동상아어린이집',
        value: '5770',
      },
      {
        displayValue: '호원동호원승리어린이집',
        value: '5769',
      },
      {
        displayValue: '남양주시아사랑어린이집',
        value: '5768',
      },
      {
        displayValue: '중계동까치유치원',
        value: '5767',
      },
      {
        displayValue: '호원동호원예뜰안어린이집',
        value: '5766',
      },
      {
        displayValue: '호원동호원코끼리어린이집',
        value: '5765',
      },
      {
        displayValue: '응암동무지개나라유치원',
        value: '5764',
      },
      {
        displayValue: '응암동무지개나라어린이집',
        value: '5763',
      },
      {
        displayValue: '홍은동서문어린이집',
        value: '5762',
      },
      {
        displayValue: '연희동하린어린이집',
        value: '5761',
      },
      {
        displayValue: '북가좌동힘찬어린이집',
        value: '5760',
      },
      {
        displayValue: '화곡동화곡본어린이집',
        value: '5759',
      },
      {
        displayValue: '등촌동별빛어린이집',
        value: '5758',
      },
      {
        displayValue: '구래동예미지빅스맘어린이집',
        value: '5757',
      },
      {
        displayValue: '운양동솜사탕어린이집',
        value: '5756',
      },
      {
        displayValue: '망원동동심영재어린이집',
        value: '5755',
      },
      {
        displayValue: '가산동새가산어린이집',
        value: '5754',
      },
      {
        displayValue: '박달동참사랑가베어린이집',
        value: '5753',
      },
      {
        displayValue: '화성시좋은나무숲어린이집',
        value: '5752',
      },
      {
        displayValue: '송산동으뜸어린이집',
        value: '5751',
      },
      {
        displayValue: '목동꿈사랑유치원',
        value: '5750',
      },
      {
        displayValue: '산척동다올어린이집',
        value: '5749',
      },
      {
        displayValue: '수유동인수유치원',
        value: '5748',
      },
      {
        displayValue: '망원동피노키오어린이집',
        value: '5747',
      },
      {
        displayValue: '식사동연세키즈스쿨어린이집',
        value: '5746',
      },
      {
        displayValue: '만수동재롱둥이어린이집',
        value: '5745',
      },
      {
        displayValue: '구월동꽃들어린이집',
        value: '5744',
      },
      {
        displayValue: '풍무동하늘빛유치원',
        value: '5743',
      },
      {
        displayValue: '걸포동꿈솔숲유치원',
        value: '5742',
      },
      {
        displayValue: '종암동아랑어린이집',
        value: '5741',
      },
      {
        displayValue: '방학동보나유치원',
        value: '5740',
      },
      {
        displayValue: '초지동새싹어린이집',
        value: '5739',
      },
      {
        displayValue: '외삼미동하늘꿈의유치원',
        value: '5738',
      },
      {
        displayValue: '반송동동탄꿈의유치원',
        value: '5737',
      },
      {
        displayValue: '상도동노벨어린이집',
        value: '5736',
      },
      {
        displayValue: '가락동안젤로스어린이집',
        value: '5735',
      },
      {
        displayValue: '중동성산아트어린이집',
        value: '5734',
      },
      {
        displayValue: '송파동기린유치원',
        value: '5733',
      },
      {
        displayValue: '화곡동리라어린이집',
        value: '5732',
      },
      {
        displayValue: '도안동우미린도담도담어린이집',
        value: '5731',
      },
      {
        displayValue: '도안동널싱맘어린이집',
        value: '5730',
      },
      {
        displayValue: '도안동예린어린이집',
        value: '5729',
      },
      {
        displayValue: '도안동아띠어린이집',
        value: '5728',
      },
      {
        displayValue: '도안동샘솟는어린이집',
        value: '5727',
      },
      {
        displayValue: '도안동다연어린이집',
        value: '5726',
      },
      {
        displayValue: '도안동호반숲어린이집',
        value: '5725',
      },
      {
        displayValue: '도안동서구해솔어린이집',
        value: '5724',
      },
      {
        displayValue: '도안동레드애플유치원',
        value: '5723',
      },
      {
        displayValue: '교촌동미메이드어린이집',
        value: '5722',
      },
      {
        displayValue: '복수동센트럴자이하랑어린이집',
        value: '5721',
      },
      {
        displayValue: '인동리틀피카소어린이집',
        value: '5720',
      },
      {
        displayValue: '목동나클래어린이집',
        value: '5719',
      },
      {
        displayValue: '천동동구해솔어린이집',
        value: '5718',
      },
      {
        displayValue: '인동아이꿈어린이집',
        value: '5717',
      },
      {
        displayValue: '탄방동미피어린이집',
        value: '5716',
      },
      {
        displayValue: '둔산동샘머리어린이집',
        value: '5715',
      },
      {
        displayValue: '목동국공립한사랑어린이집',
        value: '5714',
      },
      {
        displayValue: '반석동반석더샵어린이집',
        value: '5713',
      },
      {
        displayValue: '상대동아이파크샤인어린이집',
        value: '5712',
      },
      {
        displayValue: '소담동리버시안어린이집',
        value: '5711',
      },
      {
        displayValue: '새롬동새롬꿈어린이집',
        value: '5710',
      },
      {
        displayValue: '지족동지족앨리스어린이집',
        value: '5709',
      },
      {
        displayValue: '계산동신영어린이집',
        value: '5708',
      },
      {
        displayValue: '도룡동메이플베어어학원',
        value: '5707',
      },
      {
        displayValue: '송강동송강유치원',
        value: '5706',
      },
      {
        displayValue: '아름동참조은어린이집',
        value: '5705',
      },
      {
        displayValue: '오정동염광어린이집',
        value: '5704',
      },
      {
        displayValue: '용전동한숲어린이집',
        value: '5703',
      },
      {
        displayValue: '가오동하늘어린이집',
        value: '5702',
      },
      {
        displayValue: '청주시쑥쑥어린이집',
        value: '5701',
      },
      {
        displayValue: '아산시빛나유치원',
        value: '5700',
      },
      {
        displayValue: '쌍용동일성어린이집',
        value: '5699',
      },
      {
        displayValue: '성정동슬기샘어린이집',
        value: '5698',
      },
      {
        displayValue: '성정동무궁화어린이집',
        value: '5697',
      },
      {
        displayValue: '계룡시솔빛유치원',
        value: '5696',
      },
      {
        displayValue: '광명동키즈클럽어린이집',
        value: '5695',
      },
      {
        displayValue: '여의도동베베아미고어학원',
        value: '5694',
      },
      {
        displayValue: '구로동현일어린이집',
        value: '5693',
      },
      {
        displayValue: '신도림동신도림예능어린이집',
        value: '5692',
      },
      {
        displayValue: '구로동롯데어린이집',
        value: '5691',
      },
      {
        displayValue: '화정동예사랑유치원',
        value: '5690',
      },
      {
        displayValue: '화정동예사랑어린이집',
        value: '5689',
      },
      {
        displayValue: '삼송동삼송산새어린이집',
        value: '5688',
      },
      {
        displayValue: '원흥동드림아이유치원',
        value: '5687',
      },
      {
        displayValue: '안양동고운꿈어린이집',
        value: '5686',
      },
      {
        displayValue: '고덕동어울림어린이집',
        value: '5685',
      },
      {
        displayValue: '고덕동사랑가득어린이집',
        value: '5684',
      },
      {
        displayValue: '망월동베이비캐슬어린이집',
        value: '5683',
      },
      {
        displayValue: '기안동예솜몬테소리어린이집',
        value: '5682',
      },
      {
        displayValue: '사당동아이뜰어린이집',
        value: '5681',
      },
      {
        displayValue: '구갈동예꼬어린이집',
        value: '5680',
      },
      {
        displayValue: '원당동해그림어린이집',
        value: '5679',
      },
      {
        displayValue: '원당동일영유치원',
        value: '5678',
      },
      {
        displayValue: '반송동도토리속의숲어린이집',
        value: '5677',
      },
      {
        displayValue: '방배동서초어린이집',
        value: '5676',
      },
      {
        displayValue: '상도동초록햇살어린이집',
        value: '5675',
      },
      {
        displayValue: '상도동린아어린이집',
        value: '5674',
      },
      {
        displayValue: '상도동별초롱어린이집',
        value: '5673',
      },
      {
        displayValue: '가락동사랑숲어린이집',
        value: '5672',
      },
      {
        displayValue: '양재동한별어린이집',
        value: '5671',
      },
      {
        displayValue: '신림동맘스밀푸드연구소',
        value: '5670',
      },
      {
        displayValue: '기안동신미주어린이집',
        value: '5669',
      },
      {
        displayValue: '화성시솜사탕어린이집',
        value: '5668',
      },
      {
        displayValue: '화성시나란히어린이집',
        value: '5667',
      },
      {
        displayValue: '새솔동금강키즈어린이집',
        value: '5666',
      },
      {
        displayValue: '보라동리틀아띠랑어린이집',
        value: '5665',
      },
      {
        displayValue: '상현동상록아이어린이집',
        value: '5664',
      },
      {
        displayValue: '화성시햇살마루어린이집',
        value: '5663',
      },
      {
        displayValue: '반송동아기까꿍어린이집',
        value: '5662',
      },
      {
        displayValue: '영천동해닮어린이집',
        value: '5661',
      },
      {
        displayValue: '목동호반다온어린이집',
        value: '5660',
      },
      {
        displayValue: '방학동예아어린이집',
        value: '5659',
      },
      {
        displayValue: '호계동태영뜰어린이집',
        value: '5658',
      },
      {
        displayValue: '만리동늘푸른어린이집',
        value: '5657',
      },
      {
        displayValue: '구월동새인예유치원',
        value: '5656',
      },
      {
        displayValue: '동춘동풍림예랑어린이집',
        value: '5655',
      },
      {
        displayValue: '김포시반디어린이집',
        value: '5654',
      },
      {
        displayValue: '강일동아이즐어린이집',
        value: '5653',
      },
      {
        displayValue: '천호동소담사임당어린이집',
        value: '5652',
      },
      {
        displayValue: '호원동무지개사랑어린이집',
        value: '5651',
      },
      {
        displayValue: '민락동예하어린이집',
        value: '5650',
      },
      {
        displayValue: '호원동아이본어린이집',
        value: '5649',
      },
      {
        displayValue: '부평동로이어린이집',
        value: '5648',
      },
      {
        displayValue: '부평동꽃별어린이집',
        value: '5647',
      },
      {
        displayValue: '부평동자람어린이집',
        value: '5646',
      },
      {
        displayValue: '도화동마포삼성어린이집',
        value: '5645',
      },
      {
        displayValue: '성산동이든어린이집',
        value: '5644',
      },
      {
        displayValue: '망월동엔젤키즈어린이집',
        value: '5643',
      },
      {
        displayValue: '화곡동선미유치원',
        value: '5642',
      },
      {
        displayValue: '일신동미리내어린이집',
        value: '5641',
      },
      {
        displayValue: '상동은조유치원',
        value: '5640',
      },
      {
        displayValue: '흑석동키즈어린이집',
        value: '5639',
      },
      {
        displayValue: '사당동색동원어린이집',
        value: '5638',
      },
      {
        displayValue: '사당동아이사랑어린이집',
        value: '5637',
      },
      {
        displayValue: '응암동아이맘몬테소리어린이집',
        value: '5636',
      },
      {
        displayValue: '녹번동녹번푸름숲어린이집',
        value: '5635',
      },
      {
        displayValue: '종암동청운창의어린이집',
        value: '5634',
      },
      {
        displayValue: '상현동상현꿈사랑어린이집',
        value: '5633',
      },
      {
        displayValue: '화성시아이큰숲어린이집',
        value: '5632',
      },
      {
        displayValue: '역북동신성키즈빌어린이집',
        value: '5631',
      },
      {
        displayValue: '용인시금광어린이집',
        value: '5630',
      },
      {
        displayValue: '다산동그린키즈어린이집',
        value: '5629',
      },
      {
        displayValue: '화암동메리힐어린이집',
        value: '5628',
      },
      {
        displayValue: '충남정원어린이집',
        value: '5627',
      },
      {
        displayValue: '홍도동예지어린이집',
        value: '5626',
      },
      {
        displayValue: '사정동리더스만인어린이집',
        value: '5625',
      },
      {
        displayValue: '태평동분홍킹콩어린이집',
        value: '5624',
      },
      {
        displayValue: '괴정동정원어린이집',
        value: '5623',
      },
      {
        displayValue: '가수원동미키미니어린이집',
        value: '5622',
      },
      {
        displayValue: '고림동영화어린이집',
        value: '5621',
      },
      {
        displayValue: '신수동마포SLP',
        value: '5620',
      },
      {
        displayValue: '사동금빛어린이집',
        value: '5619',
      },
      {
        displayValue: '논현동에코하임어린이집',
        value: '5618',
      },
      {
        displayValue: '가좌동가좌예담어린이집',
        value: '5617',
      },
      {
        displayValue: '검암동서해어린이집',
        value: '5616',
      },
      {
        displayValue: '송촌동경일어린이집',
        value: '5615',
      },
      {
        displayValue: '천천동파란샘몬테소리어린이집',
        value: '5614',
      },
      {
        displayValue: '죽전동새싹어린이집',
        value: '5613',
      },
      {
        displayValue: '화성시향남하늘숲어린이집',
        value: '5612',
      },
      {
        displayValue: '인창동드림모아어린이집',
        value: '5611',
      },
      {
        displayValue: '장안동꼬마별어린이집',
        value: '5610',
      },
      {
        displayValue: '성사동토마토키즈어린이집',
        value: '5609',
      },
      {
        displayValue: '구로동피노키오어린이집',
        value: '5608',
      },
      {
        displayValue: '구로동베베몬테소리어린이집',
        value: '5607',
      },
      {
        displayValue: '오류동작은나무수수꽃다리어린이집',
        value: '5606',
      },
      {
        displayValue: '영통동초원어린이집',
        value: '5605',
      },
      {
        displayValue: '영통동귀염이어린이집',
        value: '5604',
      },
      {
        displayValue: '하동해피아이어린이집',
        value: '5603',
      },
      {
        displayValue: '인창동자람어린이집',
        value: '5602',
      },
      {
        displayValue: '인창동리틀꿈초롱어린이집',
        value: '5601',
      },
      {
        displayValue: '서현동예쁜아이어린이집',
        value: '5600',
      },
      {
        displayValue: '당산동꿈땅어린이집',
        value: '5599',
      },
      {
        displayValue: '병방동서원어린이집',
        value: '5598',
      },
      {
        displayValue: '신곡동아이예쁘지요어린이집',
        value: '5597',
      },
      {
        displayValue: '중산동두산예보미어린이집',
        value: '5596',
      },
      {
        displayValue: '식사동샬롬어린이집',
        value: '5595',
      },
      {
        displayValue: '풍동맑은누리어린이집',
        value: '5594',
      },
      {
        displayValue: '풍동숲속자연어린이집',
        value: '5593',
      },
      {
        displayValue: '토당동다올어린이집',
        value: '5592',
      },
      {
        displayValue: '오산동하랑어린이집',
        value: '5591',
      },
      {
        displayValue: '성포동영아영재어린이집',
        value: '5590',
      },
      {
        displayValue: '검암동꾸미어린이집',
        value: '5589',
      },
      {
        displayValue: '북변동서광어린이집',
        value: '5588',
      },
      {
        displayValue: '영통동밀알어린이집',
        value: '5587',
      },
      {
        displayValue: '영통동도담어린이집',
        value: '5586',
      },
      {
        displayValue: '내삼미동킨더포레스트',
        value: '5585',
      },
      {
        displayValue: '다산동꿈의숲어린이집',
        value: '5584',
      },
      {
        displayValue: '수택동E편한어린이집',
        value: '5583',
      },
      {
        displayValue: '창곡동샤론의꽃어린이집',
        value: '5582',
      },
      {
        displayValue: '장지동조이어린이집',
        value: '5581',
      },
      {
        displayValue: '별내동아가천사어린이집',
        value: '5580',
      },
      {
        displayValue: '호평동예튼어린이집',
        value: '5579',
      },
      {
        displayValue: '호평동예원몬테소리어린이집',
        value: '5578',
      },
      {
        displayValue: '호평동한화사랑어린이집',
        value: '5577',
      },
      {
        displayValue: '서현동예소어린이집',
        value: '5576',
      },
      {
        displayValue: '삼평동요한어린이집',
        value: '5575',
      },
      {
        displayValue: '신길동금빛어린이집',
        value: '5574',
      },
      {
        displayValue: '신길동킨더벨트어린이집',
        value: '5573',
      },
      {
        displayValue: '안양동동화속어린이집',
        value: '5572',
      },
      {
        displayValue: '성산동보내고싶은어린이집',
        value: '5571',
      },
      {
        displayValue: '신곡동도래샘어린이집',
        value: '5570',
      },
      {
        displayValue: '옥정동해아름어린이집',
        value: '5569',
      },
      {
        displayValue: '민락동리라어린이집',
        value: '5568',
      },
      {
        displayValue: '풍동햇살누리어린이집',
        value: '5567',
      },
      {
        displayValue: '일산동햇살가득어린이집',
        value: '5566',
      },
      {
        displayValue: '중산동숲속꿈놀이어린이집',
        value: '5565',
      },
      {
        displayValue: '화정동은빛사랑어린이집',
        value: '5564',
      },
      {
        displayValue: '도내동어린별어린이집',
        value: '5563',
      },
      {
        displayValue: '영천동동탄행복나무어린이집',
        value: '5562',
      },
      {
        displayValue: '가장동EBS하늘어린이집',
        value: '5561',
      },
      {
        displayValue: '망우동미광어린이집',
        value: '5560',
      },
      {
        displayValue: '구로동사랑모아어린이집',
        value: '5559',
      },
      {
        displayValue: '하안동킨더랜드어린이집',
        value: '5558',
      },
      {
        displayValue: '사동푸르지오7차어린이집',
        value: '5557',
      },
      {
        displayValue: '신길동온머리어린이집',
        value: '5556',
      },
      {
        displayValue: '선학동딸기어린이집',
        value: '5555',
      },
      {
        displayValue: '성사동예품어린이집',
        value: '5554',
      },
      {
        displayValue: '민락동리틀키즈보물섬어린이집',
        value: '5553',
      },
      {
        displayValue: '가능동꼬마인정어린이집',
        value: '5552',
      },
      {
        displayValue: '장항동엘리어린이집',
        value: '5551',
      },
      {
        displayValue: '장항동명지유아교실어린이집',
        value: '5550',
      },
      {
        displayValue: '일산동솔로몬어린이집',
        value: '5549',
      },
      {
        displayValue: '대화동푸르미어린이집',
        value: '5548',
      },
      {
        displayValue: '대화동송이어린이집',
        value: '5547',
      },
      {
        displayValue: '대화동샤인24시어린이집',
        value: '5546',
      },
      {
        displayValue: '충남그린캐슬어린이집',
        value: '5545',
      },
      {
        displayValue: '고운동가락키즈어린이집',
        value: '5544',
      },
      {
        displayValue: '계룡시더샵어린이집',
        value: '5543',
      },
      {
        displayValue: '금암동예닮어린이집',
        value: '5542',
      },
      {
        displayValue: '금암동루미어린이집',
        value: '5541',
      },
      {
        displayValue: '계룡시하나어린이집',
        value: '5540',
      },
      {
        displayValue: '계룡시큰별어린이집',
        value: '5539',
      },
      {
        displayValue: '충남하얀어린이집',
        value: '5538',
      },
      {
        displayValue: '충남백합유치원',
        value: '5537',
      },
      {
        displayValue: '충남원광어린이집',
        value: '5536',
      },
      {
        displayValue: '충남제일어린이집',
        value: '5535',
      },
      {
        displayValue: '충남HKIDZ어린이집',
        value: '5534',
      },
      {
        displayValue: '충남새싹어린이집',
        value: '5533',
      },
      {
        displayValue: '다정동다정한어린이집',
        value: '5532',
      },
      {
        displayValue: '고운동나숲어린이집',
        value: '5531',
      },
      {
        displayValue: '도담동우리들의어린이집',
        value: '5530',
      },
      {
        displayValue: '어진동레드애플어린이집',
        value: '5529',
      },
      {
        displayValue: '정자동KT꿈나무어린이집',
        value: '5528',
      },
      {
        displayValue: '둔산동우미어린이집',
        value: '5527',
      },
      {
        displayValue: '둔산동수정어린이집',
        value: '5526',
      },
      {
        displayValue: '상대동궁전어린이집',
        value: '5525',
      },
      {
        displayValue: '봉명동알짬어린이집',
        value: '5524',
      },
      {
        displayValue: '지족동하스람친구어린이집',
        value: '5523',
      },
      {
        displayValue: '덕암동해나라유치원',
        value: '5522',
      },
      {
        displayValue: '덕암동키즈몬테소리어린이집',
        value: '5521',
      },
      {
        displayValue: '반석동수호천사어린이집',
        value: '5520',
      },
      {
        displayValue: '지족동피노키오어린이집',
        value: '5519',
      },
      {
        displayValue: '상대동트리풀어린이집',
        value: '5518',
      },
      {
        displayValue: '상대동풀꽃사랑어린이집',
        value: '5517',
      },
      {
        displayValue: '덕명동아이숲어린이집',
        value: '5516',
      },
      {
        displayValue: '법동바론어린이집',
        value: '5515',
      },
      {
        displayValue: '반석동슈비쯔유치원',
        value: '5514',
      },
      {
        displayValue: '덕명동네오어린이집',
        value: '5513',
      },
      {
        displayValue: '장동대덕대학부속유치원',
        value: '5512',
      },
      {
        displayValue: '송강동꼬마사랑어린이집',
        value: '5511',
      },
      {
        displayValue: '송강동은평어린이집',
        value: '5510',
      },
      {
        displayValue: '봉산동봉산우리어린이집',
        value: '5509',
      },
      {
        displayValue: '하기동워릭프랭클린어학원',
        value: '5508',
      },
      {
        displayValue: '하기동바움유치원',
        value: '5507',
      },
      {
        displayValue: '죽동새싹나라유치원',
        value: '5506',
      },
      {
        displayValue: '신성동동화나라어린이집',
        value: '5505',
      },
      {
        displayValue: '신성동새싹이돋아나는어린이집',
        value: '5504',
      },
      {
        displayValue: '백석동또바기어린이집',
        value: '5503',
      },
      {
        displayValue: '백석동벽산꿈나무어린이집',
        value: '5502',
      },
      {
        displayValue: '아산시아이유쉘더퍼스트어린이집',
        value: '5501',
      },
      {
        displayValue: '쌍용동엘림어린이집',
        value: '5500',
      },
      {
        displayValue: '청당동사랑누리어린이집',
        value: '5499',
      },
      {
        displayValue: '백석동벽산하늘꿈어린이집',
        value: '5498',
      },
      {
        displayValue: '두정동해와나무어린이집',
        value: '5497',
      },
      {
        displayValue: '봉명동베스트베이비어린이집',
        value: '5496',
      },
      {
        displayValue: '아산시삼성트라움어린이집',
        value: '5495',
      },
      {
        displayValue: '신방동그린베베어린이집',
        value: '5494',
      },
      {
        displayValue: '신방동초원어린이집',
        value: '5493',
      },
      {
        displayValue: '쌍용동뽀로롱어린이집',
        value: '5492',
      },
      {
        displayValue: '쌍용동푸른어린이집',
        value: '5491',
      },
      {
        displayValue: '쌍용동능수어린이집',
        value: '5490',
      },
      {
        displayValue: '백석동그린빌오렌지어린이집',
        value: '5489',
      },
      {
        displayValue: '불당동아름드리어린이집',
        value: '5488',
      },
      {
        displayValue: '두정동부경파크빌어린이집',
        value: '5487',
      },
      {
        displayValue: '두정동서해그랑블어린이집',
        value: '5486',
      },
      {
        displayValue: '두정동세빛어린이집',
        value: '5485',
      },
      {
        displayValue: '백석동생각이크는숲어린이집',
        value: '5484',
      },
      {
        displayValue: '백석동햇살가득어린이집',
        value: '5483',
      },
      {
        displayValue: '백석동계룡리슈빌행복어린이집',
        value: '5482',
      },
      {
        displayValue: '백석동계룡리슈빌아이미소어린이집',
        value: '5481',
      },
      {
        displayValue: '백석동키즈톡어린이집',
        value: '5480',
      },
      {
        displayValue: '두정동키즈파크어린이집',
        value: '5479',
      },
      {
        displayValue: '성성동SDA삼육어린이집',
        value: '5478',
      },
      {
        displayValue: '성성동푸른솔어린이집',
        value: '5477',
      },
      {
        displayValue: '성성동꿈애뜰어린이집',
        value: '5476',
      },
      {
        displayValue: '송절동우미린도담도담어린이집',
        value: '5475',
      },
      {
        displayValue: '복대동자람터어린이집',
        value: '5474',
      },
      {
        displayValue: '청주시센트럴파크어린이집',
        value: '5473',
      },
      {
        displayValue: '청주시오창엘리트어린이집',
        value: '5472',
      },
      {
        displayValue: '청주시오창해맑은어린이집',
        value: '5471',
      },
      {
        displayValue: '청주시아이와나무어린이집',
        value: '5470',
      },
      {
        displayValue: '청주시피터팬어린이집',
        value: '5469',
      },
      {
        displayValue: '청주시모아어린이집',
        value: '5468',
      },
      {
        displayValue: '청주시별사랑어린이집',
        value: '5467',
      },
      {
        displayValue: '청주시큰별어린이집',
        value: '5466',
      },
      {
        displayValue: '청주시중앙어린이집',
        value: '5465',
      },
      {
        displayValue: '청주시행복자이어린이집',
        value: '5464',
      },
      {
        displayValue: '청주시다정어린이집',
        value: '5463',
      },
      {
        displayValue: '청주시우림2차어린이집',
        value: '5462',
      },
      {
        displayValue: '청주시참중앙어린이집',
        value: '5461',
      },
      {
        displayValue: '청주시대성어린이집',
        value: '5460',
      },
      {
        displayValue: '청주시사랑모아드림어린이집',
        value: '5459',
      },
      {
        displayValue: '주성동칸타빌키즈어린이집',
        value: '5458',
      },
      {
        displayValue: '청주시오창쌍용영재어린이집',
        value: '5457',
      },
      {
        displayValue: '용암동한흐름어린이집',
        value: '5456',
      },
      {
        displayValue: '사직동아이살림생태어린이집',
        value: '5455',
      },
      {
        displayValue: '운천동리틀킹어린이집',
        value: '5454',
      },
      {
        displayValue: '송절동푸른별어린이집',
        value: '5453',
      },
      {
        displayValue: '봉명동하얀어린이집',
        value: '5452',
      },
      {
        displayValue: '복대동아이꿈어린이집',
        value: '5451',
      },
      {
        displayValue: '복대동예인어린이집',
        value: '5450',
      },
      {
        displayValue: '가오동해담어린이집',
        value: '5449',
      },
      {
        displayValue: '천동예랑어린이집',
        value: '5448',
      },
      {
        displayValue: '성남동성남어린이집',
        value: '5447',
      },
      {
        displayValue: '대흥동아이꿈어린이집',
        value: '5446',
      },
      {
        displayValue: '태평동밤비니어린이집',
        value: '5445',
      },
      {
        displayValue: '낭월동돋을별어린이집',
        value: '5444',
      },
      {
        displayValue: '홍도동솔로몬어린이집',
        value: '5443',
      },
      {
        displayValue: '용전동무지개어린이집',
        value: '5442',
      },
      {
        displayValue: '성남동효촌마을어린이집',
        value: '5441',
      },
      {
        displayValue: '신흥동어린이집',
        value: '5440',
      },
      {
        displayValue: '대동해바라기어린이집',
        value: '5439',
      },
      {
        displayValue: '용운동새록새록어린이집',
        value: '5438',
      },
      {
        displayValue: '용운동새봄유치원',
        value: '5437',
      },
      {
        displayValue: '판암동그린코아어린이집',
        value: '5436',
      },
      {
        displayValue: '대흥동자이킨더어린이집',
        value: '5435',
      },
      {
        displayValue: '태평동동양유치원',
        value: '5434',
      },
      {
        displayValue: '산성동아림어린이집',
        value: '5433',
      },
      {
        displayValue: '선화동꼬마별어린이집',
        value: '5432',
      },
      {
        displayValue: '용두동강남어린이집',
        value: '5431',
      },
      {
        displayValue: '부사동하나둘셋어린이집',
        value: '5430',
      },
      {
        displayValue: '문창동리틀비전어린이집',
        value: '5429',
      },
      {
        displayValue: '석교동예손어린이집',
        value: '5428',
      },
      {
        displayValue: '천동위드힐어린이집',
        value: '5427',
      },
      {
        displayValue: '중촌동별초롱어린이집',
        value: '5426',
      },
      {
        displayValue: '오류동그리다어린이집',
        value: '5425',
      },
      {
        displayValue: '태평동예가윤슬어린이집',
        value: '5424',
      },
      {
        displayValue: '태평동버드내어린이집',
        value: '5423',
      },
      {
        displayValue: '원신흥동미소가득어린이집',
        value: '5422',
      },
      {
        displayValue: '갈마동경성햇살어린이집',
        value: '5421',
      },
      {
        displayValue: '원내동한샘어린이집',
        value: '5420',
      },
      {
        displayValue: '갈마동꿈나래어린이집',
        value: '5419',
      },
      {
        displayValue: '둔산동햇님굿맘어린이집',
        value: '5418',
      },
      {
        displayValue: '둔산동작은천국어린이집',
        value: '5417',
      },
      {
        displayValue: '관저동조이랜드어린이집',
        value: '5416',
      },
      {
        displayValue: '둔산동아리솔어린이집',
        value: '5415',
      },
      {
        displayValue: '탄방동꿈이큰어린이집',
        value: '5414',
      },
      {
        displayValue: '가수원동새솔어린이집',
        value: '5413',
      },
      {
        displayValue: '변동비비창의어린이집',
        value: '5412',
      },
      {
        displayValue: '둔산동은빛유치원',
        value: '5411',
      },
      {
        displayValue: '둔산동별그림어린이집',
        value: '5410',
      },
      {
        displayValue: '괴정동서대전어린이집',
        value: '5409',
      },
      {
        displayValue: '변동아이솔어린이집',
        value: '5408',
      },
      {
        displayValue: '가장동구슬어린이집',
        value: '5407',
      },
      {
        displayValue: '둔산동SLP대전어학원',
        value: '5406',
      },
      {
        displayValue: '복수동자이숲어린이집',
        value: '5405',
      },
      {
        displayValue: '복수동마루미어린이집',
        value: '5404',
      },
      {
        displayValue: '정림동숲으로어린이집',
        value: '5403',
      },
      {
        displayValue: '관저동아이샘어린이집',
        value: '5402',
      },
      {
        displayValue: '관저동다솜어린이집',
        value: '5401',
      },
      {
        displayValue: '관저동해든어린이집',
        value: '5400',
      },
      {
        displayValue: '관저동엄마품어린이집',
        value: '5399',
      },
      {
        displayValue: '관저동꼬마요정어린이집',
        value: '5398',
      },
      {
        displayValue: '관저동예그랑어린이집',
        value: '5397',
      },
      {
        displayValue: '관저동아이누리유치원',
        value: '5396',
      },
      {
        displayValue: '배곧동중흥사랑어린이집',
        value: '5395',
      },
      {
        displayValue: '배곧동하나둘셋어린이집',
        value: '5394',
      },
      {
        displayValue: '하안동우리아기어린이집',
        value: '5393',
      },
      {
        displayValue: '하안동꿀송이어린이집',
        value: '5392',
      },
      {
        displayValue: '개봉동예사랑어린이집',
        value: '5391',
      },
      {
        displayValue: '신도림동백호사랑어린이집',
        value: '5390',
      },
      {
        displayValue: '철산동브니엘어린이집',
        value: '5389',
      },
      {
        displayValue: '하안동아이빛어린이집',
        value: '5388',
      },
      {
        displayValue: '하안동이든샘어린이집',
        value: '5387',
      },
      {
        displayValue: '하안동고은별어린이집',
        value: '5386',
      },
      {
        displayValue: '하안동사랑의손어린이집',
        value: '5385',
      },
      {
        displayValue: '하안동예꿈어린이집',
        value: '5384',
      },
      {
        displayValue: '하안동리나어린이집',
        value: '5383',
      },
      {
        displayValue: '소하동꿈나래어린이집',
        value: '5382',
      },
      {
        displayValue: '장현동하은별어린이집',
        value: '5381',
      },
      {
        displayValue: '고잔동지혜어린이집',
        value: '5380',
      },
      {
        displayValue: '은행동야호어린이집',
        value: '5379',
      },
      {
        displayValue: '신천동시온어린이집',
        value: '5378',
      },
      {
        displayValue: '일동또래어린이집',
        value: '5377',
      },
      {
        displayValue: '사동참예지어린이집',
        value: '5376',
      },
      {
        displayValue: '초지동파란마음어린이집',
        value: '5375',
      },
      {
        displayValue: '고잔동맑고밝은어린이집',
        value: '5374',
      },
      {
        displayValue: '성포동행복한천사어린이집',
        value: '5373',
      },
      {
        displayValue: '원곡동키즈아일랜드',
        value: '5372',
      },
      {
        displayValue: '장기동꿈샘어린이집',
        value: '5371',
      },
      {
        displayValue: '장기동칭찬가득어린이집',
        value: '5370',
      },
      {
        displayValue: '장기동자이하늘어린이집',
        value: '5369',
      },
      {
        displayValue: '신월동유앤미어린이집',
        value: '5368',
      },
      {
        displayValue: '화곡동제일어린이집',
        value: '5367',
      },
      {
        displayValue: '내발산동알앤티키즈어학원',
        value: '5366',
      },
      {
        displayValue: '중동사랑나무유치원',
        value: '5365',
      },
      {
        displayValue: '상동포그니어린이집',
        value: '5364',
      },
      {
        displayValue: '소사본동예뜨란어린이집',
        value: '5363',
      },
      {
        displayValue: '약대동아이파크어린이집',
        value: '5362',
      },
      {
        displayValue: '원미동위니어린이집',
        value: '5361',
      },
      {
        displayValue: '괴안동홍지유치원',
        value: '5360',
      },
      {
        displayValue: '약대동키즈월드어린이집',
        value: '5359',
      },
      {
        displayValue: '중동중앙유치원',
        value: '5358',
      },
      {
        displayValue: '중동꼬마천사어린이집',
        value: '5357',
      },
      {
        displayValue: '중동아이슐레',
        value: '5356',
      },
      {
        displayValue: '중동큰사랑어린이집',
        value: '5355',
      },
      {
        displayValue: '상동초록나무유치원',
        value: '5354',
      },
      {
        displayValue: '상동해와달유치원',
        value: '5353',
      },
      {
        displayValue: '상동세화유치원',
        value: '5352',
      },
      {
        displayValue: '상동풍림꿈어린이집',
        value: '5351',
      },
      {
        displayValue: '상동백송어린이집',
        value: '5350',
      },
      {
        displayValue: '상동세하어린이집',
        value: '5349',
      },
      {
        displayValue: '풍무동꿈이있는신안어린이집',
        value: '5348',
      },
      {
        displayValue: '풍무동이화유치원',
        value: '5347',
      },
      {
        displayValue: '김포시늘품자연유치원',
        value: '5346',
      },
      {
        displayValue: '천천동하랑어린이집',
        value: '5345',
      },
      {
        displayValue: '천천동신비어린이집',
        value: '5344',
      },
      {
        displayValue: '정자동싱글벙글어린이집',
        value: '5343',
      },
      {
        displayValue: '정자동그린맘어린이집',
        value: '5342',
      },
      {
        displayValue: '조원동방주어린이집',
        value: '5341',
      },
      {
        displayValue: '하동코엘리광교어학원',
        value: '5340',
      },
      {
        displayValue: '탑동향기나무어린이집',
        value: '5339',
      },
      {
        displayValue: '호매실동밀알몬테소리어린이집',
        value: '5338',
      },
      {
        displayValue: '영통동아기생각어린이집',
        value: '5337',
      },
      {
        displayValue: '원천동신나는어린이집',
        value: '5336',
      },
      {
        displayValue: '인계동선경유치원',
        value: '5335',
      },
      {
        displayValue: '세류동아이다움어린이집',
        value: '5334',
      },
      {
        displayValue: '구운동방주어린이집',
        value: '5333',
      },
      {
        displayValue: '화서동세모네모어린이집',
        value: '5332',
      },
      {
        displayValue: '풍덕천동수지아름다운어린이집',
        value: '5331',
      },
      {
        displayValue: '상현동벽산해맑은어린이집',
        value: '5330',
      },
      {
        displayValue: '상현동벽산꿈사랑어린이집',
        value: '5329',
      },
      {
        displayValue: '상현동꿈꾸는아이들어린이집',
        value: '5328',
      },
      {
        displayValue: '신봉동신봉사랑나무어린이집',
        value: '5327',
      },
      {
        displayValue: '풍덕천동쁘띠미미어린이집',
        value: '5326',
      },
      {
        displayValue: '신갈동푸른아이들어린이집',
        value: '5325',
      },
      {
        displayValue: '신갈동토들러어린이집',
        value: '5324',
      },
      {
        displayValue: '신갈동밤비니키즈어린이집',
        value: '5323',
      },
      {
        displayValue: '신갈동녹원어린이집',
        value: '5322',
      },
      {
        displayValue: '용인시해피키즈어린이집',
        value: '5321',
      },
      {
        displayValue: '죽전동에코비주주어린이집',
        value: '5320',
      },
      {
        displayValue: '마북동신창우리어린이집',
        value: '5319',
      },
      {
        displayValue: '마북동예빛어린이집',
        value: '5318',
      },
      {
        displayValue: '마북동LG해맑은어린이집',
        value: '5317',
      },
      {
        displayValue: '청덕동신동백어린이집',
        value: '5316',
      },
      {
        displayValue: '중동통큰아이어린이집',
        value: '5315',
      },
      {
        displayValue: '부산동자이어린이집',
        value: '5314',
      },
      {
        displayValue: '부산동시립자이꿈미어린이집',
        value: '5313',
      },
      {
        displayValue: '오산동시립가온어린이집',
        value: '5312',
      },
      {
        displayValue: '금암동시립오산세교복지타운어린이집',
        value: '5311',
      },
      {
        displayValue: '양산동시립한신어린이집',
        value: '5310',
      },
      {
        displayValue: '화성시신나라어린이집',
        value: '5309',
      },
      {
        displayValue: '화성시꽃초롱어린이집',
        value: '5308',
      },
      {
        displayValue: '화성시부영나래어린이집',
        value: '5307',
      },
      {
        displayValue: '용인시홀츠앤키즈어린이집',
        value: '5306',
      },
      {
        displayValue: '용인시아이햇살어린이집',
        value: '5305',
      },
      {
        displayValue: '유방동리틀성웅어린이집',
        value: '5304',
      },
      {
        displayValue: '김량장동해랑어린이집',
        value: '5303',
      },
      {
        displayValue: '삼가동오스카빌어린이집',
        value: '5302',
      },
      {
        displayValue: '중동지혜샘어린이집',
        value: '5301',
      },
      {
        displayValue: '동백동이레어린이집',
        value: '5300',
      },
      {
        displayValue: '동백동다솜어린이집',
        value: '5299',
      },
      {
        displayValue: '기안동광도어린이집',
        value: '5298',
      },
      {
        displayValue: '기안동다온유치원',
        value: '5297',
      },
      {
        displayValue: '화성시반짝반짝어린이집',
        value: '5296',
      },
      {
        displayValue: '화성시아이파크어린이집',
        value: '5295',
      },
      {
        displayValue: '화성시동일키즈어린이집',
        value: '5294',
      },
      {
        displayValue: '화성시동문지혜샘어린이집',
        value: '5293',
      },
      {
        displayValue: '새솔동새솔아이엘어린이집',
        value: '5292',
      },
      {
        displayValue: '화성시키즈로베어린이집',
        value: '5291',
      },
      {
        displayValue: '화성시베이비붐어린이집',
        value: '5290',
      },
      {
        displayValue: '고매동쁘띠앙쥬어린이집',
        value: '5289',
      },
      {
        displayValue: '보라동오렌지나무어린이집',
        value: '5288',
      },
      {
        displayValue: '보라동꼬마별키즈어린이집',
        value: '5287',
      },
      {
        displayValue: '공세동꿈자람어린이집',
        value: '5286',
      },
      {
        displayValue: '장지동자이맘어린이집',
        value: '5285',
      },
      {
        displayValue: '장지동아이조아어린이집',
        value: '5284',
      },
      {
        displayValue: '산척동즐거운어린이집',
        value: '5283',
      },
      {
        displayValue: '목동동원다올어린이집',
        value: '5282',
      },
      {
        displayValue: '목동호반아이사랑어린이집',
        value: '5281',
      },
      {
        displayValue: '목동사랑가득어린이집',
        value: '5280',
      },
      {
        displayValue: '청계동푸르지오어린이집',
        value: '5279',
      },
      {
        displayValue: '영천동꿈미어린이집',
        value: '5278',
      },
      {
        displayValue: '오산동새론어린이집',
        value: '5277',
      },
      {
        displayValue: '반송동펀샤인어린이집',
        value: '5276',
      },
      {
        displayValue: '병점동아마데우스어린이집',
        value: '5275',
      },
      {
        displayValue: '병점동꿈사랑어린이집',
        value: '5274',
      },
      {
        displayValue: '다산동신안꿈어린이집',
        value: '5273',
      },
      {
        displayValue: '갈매동다사랑어린이집',
        value: '5272',
      },
      {
        displayValue: '다산동다산씽씽어린이집',
        value: '5271',
      },
      {
        displayValue: '다산동아이푸른어린이집',
        value: '5270',
      },
      {
        displayValue: '신천동장미유치원',
        value: '5269',
      },
      {
        displayValue: '방이동별빛어린이집',
        value: '5268',
      },
      {
        displayValue: '오금동라원어린이집',
        value: '5267',
      },
      {
        displayValue: '가락동마이메리어린이집',
        value: '5266',
      },
      {
        displayValue: '가락동엘프랜드어린이집',
        value: '5265',
      },
      {
        displayValue: '송파동한나몬테소리어린이집',
        value: '5264',
      },
      {
        displayValue: '잠실동예일어린이집',
        value: '5263',
      },
      {
        displayValue: '잠실동에이미킨디영어유치원',
        value: '5262',
      },
      {
        displayValue: '청담동강남힐스어린이집',
        value: '5261',
      },
      {
        displayValue: '장지동꿈초롱어린이집',
        value: '5260',
      },
      {
        displayValue: '장지동꿈에그린어린이집',
        value: '5259',
      },
      {
        displayValue: '장지동리딩비송파위례어학원',
        value: '5258',
      },
      {
        displayValue: '학암동플로리체어린이집',
        value: '5257',
      },
      {
        displayValue: '장지동키즈리베어린이집',
        value: '5256',
      },
      {
        displayValue: '장지동위버지니어스위례원',
        value: '5255',
      },
      {
        displayValue: '거여동(지점)아이숲어린이집',
        value: '5254',
      },
      {
        displayValue: '거여동예꿈어린이집',
        value: '5253',
      },
      {
        displayValue: '장지동로뎀나무어린이집',
        value: '5252',
      },
      {
        displayValue: '야탑동바다어린이집',
        value: '5251',
      },
      {
        displayValue: '신흥동조이풀어린이집',
        value: '5250',
      },
      {
        displayValue: '삼평동위즈아일랜드동판교이매원',
        value: '5249',
      },
      {
        displayValue: '전농동빛나어린이집',
        value: '5248',
      },
      {
        displayValue: '중계동샬롬어린이집',
        value: '5247',
      },
      {
        displayValue: '하계동엘파인어학원',
        value: '5246',
      },
      {
        displayValue: '하계동짐랜드어린이집',
        value: '5245',
      },
      {
        displayValue: '월계동삼창어린이집',
        value: '5244',
      },
      {
        displayValue: '신내동모모어린이집',
        value: '5243',
      },
      {
        displayValue: '남양주시위브천사어린이집',
        value: '5242',
      },
      {
        displayValue: '별내동예꼬방어린이집',
        value: '5241',
      },
      {
        displayValue: '별내동뽀롱뽀롱어린이집',
        value: '5240',
      },
      {
        displayValue: '별내동햇살모아어린이집',
        value: '5239',
      },
      {
        displayValue: '남양주시백마어린이집',
        value: '5238',
      },
      {
        displayValue: '남양주시사릉삼육어린이집',
        value: '5237',
      },
      {
        displayValue: '평내동다온어린이집',
        value: '5236',
      },
      {
        displayValue: '강일동은빛꼬마숲어린이집',
        value: '5235',
      },
      {
        displayValue: '풍납동수어린이집',
        value: '5234',
      },
      {
        displayValue: '풍납동다솜어린이집',
        value: '5233',
      },
      {
        displayValue: '암사동선사어린이집',
        value: '5232',
      },
      {
        displayValue: '상일동리틀아트짐어린이집',
        value: '5231',
      },
      {
        displayValue: '상일동두빛나래어린이집',
        value: '5230',
      },
      {
        displayValue: '천호동새싹어린이집',
        value: '5229',
      },
      {
        displayValue: '둔촌동둔촌아이사랑어린이집',
        value: '5228',
      },
      {
        displayValue: '둔촌동엔젤어린이집',
        value: '5227',
      },
      {
        displayValue: '자양동착한어린이집',
        value: '5226',
      },
      {
        displayValue: '능동어린이회관유치원',
        value: '5225',
      },
      {
        displayValue: '자양동선경유치원',
        value: '5224',
      },
      {
        displayValue: '자양동정신유치원',
        value: '5223',
      },
      {
        displayValue: '성수동개나리동산어린이집',
        value: '5222',
      },
      {
        displayValue: '덕풍동자람어린이집',
        value: '5221',
      },
      {
        displayValue: '망월동홍익키즈어린이집',
        value: '5220',
      },
      {
        displayValue: '선동푸르지오어린이집',
        value: '5219',
      },
      {
        displayValue: '남양주시하영유치원',
        value: '5218',
      },
      {
        displayValue: '남양주시진도어린이집',
        value: '5217',
      },
      {
        displayValue: '판교동해뜰어린이집',
        value: '5216',
      },
      {
        displayValue: '서현동초록나무숲어린이집',
        value: '5215',
      },
      {
        displayValue: '운중동태영어린이집',
        value: '5214',
      },
      {
        displayValue: '판교동불꽃어린이집',
        value: '5213',
      },
      {
        displayValue: '대방동키즈맘어린이집',
        value: '5212',
      },
      {
        displayValue: '여의도동재잘재잘놀이학교',
        value: '5211',
      },
      {
        displayValue: '김포시해누리어린이집',
        value: '5210',
      },
      {
        displayValue: '김포시그린코아어린이집',
        value: '5209',
      },
      {
        displayValue: '김포시이솝어린이집',
        value: '5208',
      },
      {
        displayValue: '김포시금호어울림어린이집',
        value: '5207',
      },
      {
        displayValue: '구래동나비동산어린이집',
        value: '5206',
      },
      {
        displayValue: '구래동싱글벙글어린이집',
        value: '5205',
      },
      {
        displayValue: '마산동동화속어린이집',
        value: '5204',
      },
      {
        displayValue: '평촌동다하어린이집',
        value: '5203',
      },
      {
        displayValue: '갈현동과천시CLC어학원',
        value: '5202',
      },
      {
        displayValue: '관양동짝꿍어린이집',
        value: '5201',
      },
      {
        displayValue: '관양동꼬마샛별어린이집',
        value: '5200',
      },
      {
        displayValue: '안양동씨엘어린이집',
        value: '5199',
      },
      {
        displayValue: '안양동삼성래미안어린이집',
        value: '5198',
      },
      {
        displayValue: '안양동키즈플레이어린이집',
        value: '5197',
      },
      {
        displayValue: '박달동해와솔어린이집',
        value: '5196',
      },
      {
        displayValue: '박달동해피키즈어린이집',
        value: '5195',
      },
      {
        displayValue: '석수동아이파크자연어린이집',
        value: '5194',
      },
      {
        displayValue: '진관동숲유치원',
        value: '5193',
      },
      {
        displayValue: '진관동해아뜰어린이집',
        value: '5192',
      },
      {
        displayValue: '신원동해피트리어린이집',
        value: '5191',
      },
      {
        displayValue: '삼송동삼송꼬마별어린이집',
        value: '5190',
      },
      {
        displayValue: '동산동호반꼬마숲어린이집',
        value: '5189',
      },
      {
        displayValue: '동산동파크드림빅스맘어린이집',
        value: '5188',
      },
      {
        displayValue: '동산동칭찬가득어린이집',
        value: '5187',
      },
      {
        displayValue: '대자동자유산새어린이집',
        value: '5186',
      },
      {
        displayValue: '관산동시립가장어린이집',
        value: '5185',
      },
      {
        displayValue: '고양동현대예쁜생각어린이집',
        value: '5184',
      },
      {
        displayValue: '호원동호원큰별어린이집',
        value: '5183',
      },
      {
        displayValue: '의정부동키즈캐슬어린이집',
        value: '5182',
      },
      {
        displayValue: '장암동장암하늘어린이집',
        value: '5181',
      },
      {
        displayValue: '병방동도토리어린이집',
        value: '5180',
      },
      {
        displayValue: '계산동트루엘키즈어린이집',
        value: '5179',
      },
      {
        displayValue: '계산동신도어린이집',
        value: '5178',
      },
      {
        displayValue: '계산동하늘어린이집',
        value: '5177',
      },
      {
        displayValue: '작전동새하늘어린이집',
        value: '5176',
      },
      {
        displayValue: '효성동에코i숲어린이집',
        value: '5175',
      },
      {
        displayValue: '효성동봄소리어린이집',
        value: '5174',
      },
      {
        displayValue: '신현동대성할아이어린이집',
        value: '5173',
      },
      {
        displayValue: '학익동한빛유치원',
        value: '5172',
      },
      {
        displayValue: '주안동키즈스쿨어린이집',
        value: '5171',
      },
      {
        displayValue: '도화동신동아푸른나무어린이집',
        value: '5170',
      },
      {
        displayValue: '학익동이삭어린이집',
        value: '5169',
      },
      {
        displayValue: '학익동푸른섬어린이집',
        value: '5168',
      },
      {
        displayValue: '옥련동라온가정어린이집',
        value: '5167',
      },
      {
        displayValue: '송도동해오름어린이집',
        value: '5166',
      },
      {
        displayValue: '동춘동동화나라유치원',
        value: '5165',
      },
      {
        displayValue: '연수동우성어린이집',
        value: '5164',
      },
      {
        displayValue: '동춘동어깨동무어린이집',
        value: '5163',
      },
      {
        displayValue: '연수동예쁜아이어린이집',
        value: '5162',
      },
      {
        displayValue: '화정동고양SLP',
        value: '5161',
      },
      {
        displayValue: '행신동서정푸른숲어린이집',
        value: '5160',
      },
      {
        displayValue: '토당동시립능곡아이어린이집',
        value: '5159',
      },
      {
        displayValue: '성사동어울림유치원',
        value: '5158',
      },
      {
        displayValue: '구산동하나로사랑담어린이집',
        value: '5157',
      },
      {
        displayValue: '신사동정다운어린이집',
        value: '5156',
      },
      {
        displayValue: '녹번동나봄어린이집',
        value: '5155',
      },
      {
        displayValue: '증산동꿈이열리는어린이집',
        value: '5154',
      },
      {
        displayValue: '성산동코코엔젤어린이집',
        value: '5153',
      },
      {
        displayValue: '산천동푸른숲속어린이집',
        value: '5152',
      },
      {
        displayValue: '망원동선애어린이집',
        value: '5151',
      },
      {
        displayValue: '도화동고은어린이집',
        value: '5150',
      },
      {
        displayValue: '대흥동태영유치원',
        value: '5149',
      },
      {
        displayValue: '미아동새서울어린이집',
        value: '5148',
      },
      {
        displayValue: '수유동길물빛유치원',
        value: '5147',
      },
      {
        displayValue: '수유동물댄동산어린이집',
        value: '5146',
      },
      {
        displayValue: '수유동푸른솔어린이집',
        value: '5145',
      },
      {
        displayValue: '창동상상어린이집',
        value: '5144',
      },
      {
        displayValue: '삼숭동미소자이어린이집',
        value: '5143',
      },
      {
        displayValue: '옥정동해나어린이집',
        value: '5142',
      },
      {
        displayValue: '민락동예향어린이집',
        value: '5141',
      },
      {
        displayValue: '민락동참빛아이어린이집',
        value: '5140',
      },
      {
        displayValue: '만송동새나어린이집',
        value: '5139',
      },
      {
        displayValue: '덕계동에버빌어린이집',
        value: '5138',
      },
      {
        displayValue: '고암동꼬꼬마어린이집',
        value: '5137',
      },
      {
        displayValue: '십정동예담아트어린이집',
        value: '5136',
      },
      {
        displayValue: '십정동해솔어린이집',
        value: '5135',
      },
      {
        displayValue: '부평동동아꼬마숲어린이집',
        value: '5134',
      },
      {
        displayValue: '일신동예솔어린이집',
        value: '5133',
      },
      {
        displayValue: '부개동참사랑어린이집',
        value: '5132',
      },
      {
        displayValue: '부개동신보람어린이집',
        value: '5131',
      },
      {
        displayValue: '주엽동초록마을어린이집',
        value: '5130',
      },
      {
        displayValue: '주엽동동화어린이집',
        value: '5129',
      },
      {
        displayValue: '풍동무지개숲어린이집',
        value: '5128',
      },
      {
        displayValue: '중산동힐사이드',
        value: '5127',
      },
      {
        displayValue: '중산동이야스콜라',
        value: '5126',
      },
      {
        displayValue: '성석동토마토어린이집',
        value: '5125',
      },
      {
        displayValue: '마두동백마꿈나무어린이집',
        value: '5124',
      },
      {
        displayValue: '탄현동키즈봉봉어린이집',
        value: '5123',
      },
      {
        displayValue: '탄현동자연유치원',
        value: '5122',
      },
      {
        displayValue: '탄현동오마이어린이집',
        value: '5121',
      },
      {
        displayValue: '탄현동연세어린이집',
        value: '5120',
      },
      {
        displayValue: '탄현동맑은샘어린이집',
        value: '5119',
      },
      {
        displayValue: '탄현동도담유치원',
        value: '5118',
      },
      {
        displayValue: '탄현동다온어린이집',
        value: '5117',
      },
      {
        displayValue: '덕이동현대그린애플어린이집',
        value: '5116',
      },
      {
        displayValue: '덕이동한나래유치원',
        value: '5115',
      },
      {
        displayValue: '덕이동태영아이어린이집',
        value: '5114',
      },
      {
        displayValue: '대화동동문키즈어린이집',
        value: '5113',
      },
      {
        displayValue: '가좌동꼬마에디슨어린이집',
        value: '5112',
      },
      {
        displayValue: '사당동패스트랙키즈인터내셔널(초등관)',
        value: '5111',
      },
      {
        displayValue: '사당동패스트랙키즈인터내셔널',
        value: '5110',
      },
      {
        displayValue: '사당동동그라미유치원',
        value: '5109',
      },
      {
        displayValue: '상도동샛별유치원',
        value: '5108',
      },
      {
        displayValue: '봉천동서울유치원',
        value: '5107',
      },
      {
        displayValue: '본동킨더어린이집',
        value: '5106',
      },
      {
        displayValue: '서초동바름이어린이집',
        value: '5105',
      },
      {
        displayValue: '사당동예성어린이집',
        value: '5104',
      },
      {
        displayValue: '설운동짐랜드어린이집',
        value: '5103',
      },
      {
        displayValue: '신읍동리틀쟈니어린이집',
        value: '5102',
      },
      {
        displayValue: '신읍동쟈니어린이집',
        value: '5101',
      },
      {
        displayValue: '포천시파란나라어린이집',
        value: '5100',
      },
      {
        displayValue: '홍제동푸른꿈동산어린이집',
        value: '5099',
      },
      {
        displayValue: '하월곡동월곡무지개어린이집',
        value: '5098',
      },
      {
        displayValue: '장위동장위어린이집',
        value: '5097',
      },
      {
        displayValue: '정릉동연꽃어린이집',
        value: '5096',
      },
      {
        displayValue: '보문동신암유치원',
        value: '5095',
      },
      {
        displayValue: '길음동e편한세상어린이집',
        value: '5094',
      },
      {
        displayValue: '보문동사임당어린이집',
        value: '5093',
      },
      {
        displayValue: '와동동위즈아이어린이집',
        value: '5092',
      },
      {
        displayValue: '아동동새롬유치원',
        value: '5091',
      },
      {
        displayValue: '동패동빛고운유치원',
        value: '5090',
      },
      {
        displayValue: '동패동누리어린이집',
        value: '5089',
      },
      {
        displayValue: '다율동솜사탕어린이집',
        value: '5088',
      },
      {
        displayValue: '금촌동홍익늘푸른유치원',
        value: '5087',
      },
      {
        displayValue: '금촌동홍익늘푸른어린이집',
        value: '5086',
      },
      {
        displayValue: '금촌동아이와어린이집',
        value: '5085',
      },
      {
        displayValue: '금촌동다온어린이집',
        value: '5084',
      },
      {
        displayValue: '마산동아기구름어린이집',
        value: '5083',
      },
      {
        displayValue: '옥정동옥정달빛어린이집',
        value: '5035',
      },
      {
        displayValue: '토평동토평어린이집',
        value: '5034',
      },
      {
        displayValue: '장항동꿈비어린이집',
        value: '5002',
      },
      {
        displayValue: '옥정동별이든어린이집',
        value: '5001',
      },
      {
        displayValue: '등촌동꿈이있는어린이집',
        value: '4985',
      },
      {
        displayValue: '지축동고양시립지축어린이집',
        value: '4889',
      },
      {
        displayValue: '대치동여명어린이집',
        value: '4888',
      },
      {
        displayValue: '상계동늘푸른어린이집',
        value: '4887',
      },
      {
        displayValue: '중곡동구립아이와나무어린이집',
        value: '4886',
      },
      {
        displayValue: '신천동FPD국제학교',
        value: '4854',
      },
      {
        displayValue: '자양동해든어린이집',
        value: '4853',
      },
      {
        displayValue: '장현동햇님나라어린이집',
        value: '4852',
      },
      {
        displayValue: '소하동구름산유치원',
        value: '4817',
      },
      {
        displayValue: '별내동사랑별아이파크어린이집',
        value: '4791',
      },
      {
        displayValue: '방학동방학가람어린이집',
        value: '4773',
      },
      {
        displayValue: '신대방동구립보라매어린이집',
        value: '4772',
      },
      {
        displayValue: '원효로1가세인트메리주니어(특강)',
        value: '4771',
      },
      {
        displayValue: '남현동새싹유치원',
        value: '4770',
      },
      {
        displayValue: '천왕동천왕숲어린이집',
        value: '4769',
      },
      {
        displayValue: '가재동우림천사어린이집',
        value: '4768',
      },
      {
        displayValue: '삼가동용인시청상록어린이집',
        value: '4767',
      },
      {
        displayValue: '병점동숙명키즈어린이집',
        value: '4766',
      },
      {
        displayValue: '신림동난곡초병설유치원(돌봄)',
        value: '4765',
      },
      {
        displayValue: '신림동난곡초등학교(돌봄)',
        value: '4764',
      },
      {
        displayValue: '방배동차반',
        value: '4763',
      },
      {
        displayValue: '소하동해누리유치원',
        value: '4762',
      },
      {
        displayValue: '덕이동아이밥',
        value: '4761',
      },
      {
        displayValue: '자양동신양초등학교병설유치원',
        value: '4729',
      },
      {
        displayValue: '송도동조이플어린이집',
        value: '4713',
      },
      {
        displayValue: '옥정동아이린어린이집',
        value: '4697',
      },
      {
        displayValue: '원당동호반써밋어린이집',
        value: '4696',
      },
      {
        displayValue: '장안동예지어린이집',
        value: '4695',
      },
      {
        displayValue: '화성시윤슬어린이집',
        value: '4691',
      },
      {
        displayValue: '화성시다나어린이집',
        value: '4687',
      },
      {
        displayValue: '수유동예인어린이집',
        value: '4670',
      },
      {
        displayValue: '전농동예성어린이집',
        value: '4669',
      },
      {
        displayValue: '부개동꿈터어린이집',
        value: '4637',
      },
      {
        displayValue: '도내동노리숲어린이집',
        value: '4605',
      },
      {
        displayValue: '풍덕천동진산푸른숲어린이집',
        value: '4588',
      },
      {
        displayValue: '온수동사랑샘어린이집',
        value: '4587',
      },
      {
        displayValue: '능동어린이회관유치원',
        value: '4586',
      },
      {
        displayValue: '돈암동아랑유치원',
        value: '4585',
      },
      {
        displayValue: '대흥동태영유치원',
        value: '4584',
      },
      {
        displayValue: '신길동대방초병설유치원',
        value: '4583',
      },
      {
        displayValue: '잠실동에이미킨디영어유치원',
        value: '4582',
      },
      {
        displayValue: '상동해와달유치원',
        value: '4581',
      },
      {
        displayValue: '동패동빛고운유치원',
        value: '4580',
      },
      {
        displayValue: '아동동새롬유치원',
        value: '4579',
      },
      {
        displayValue: '하기동바움유치원',
        value: '4578',
      },
      {
        displayValue: '둔산동은빛유치원',
        value: '4577',
      },
      {
        displayValue: '하계동엘파인어학원',
        value: '4576',
      },
      {
        displayValue: '산현동헬렌도론',
        value: '4575',
      },
      {
        displayValue: '북변동김포ecc',
        value: '4574',
      },
      {
        displayValue: '구의동구의2동어린이집',
        value: '4573',
      },
      {
        displayValue: '자양동광진어린이집',
        value: '4572',
      },
      {
        displayValue: '장위동장위어린이집',
        value: '4571',
      },
      {
        displayValue: '보문동사임당어린이집',
        value: '4570',
      },
      {
        displayValue: '미아동새서울어린이집',
        value: '4569',
      },
      {
        displayValue: '하계동짐랜드어린이집',
        value: '4568',
      },
      {
        displayValue: '화곡동힐스테이트어린이집',
        value: '4567',
      },
      {
        displayValue: '사당동예성어린이집',
        value: '4566',
      },
      {
        displayValue: '장지동꿈에그린어린이집',
        value: '4565',
      },
      {
        displayValue: '장지동꿈초롱어린이집',
        value: '4564',
      },
      {
        displayValue: '둔촌동둔촌아이사랑어린이집',
        value: '4563',
      },
      {
        displayValue: '원천동신나는어린이집',
        value: '4562',
      },
      {
        displayValue: '판교동아이트라움어린이집',
        value: '4561',
      },
      {
        displayValue: '장암동장암하늘어린이집',
        value: '4560',
      },
      {
        displayValue: '석수동아이파크자연어린이집',
        value: '4559',
      },
      {
        displayValue: '평촌동해와달어린이집',
        value: '4558',
      },
      {
        displayValue: '상동백송어린이집',
        value: '4557',
      },
      {
        displayValue: '상동세하어린이집',
        value: '4556',
      },
      {
        displayValue: '원미동위니어린이집',
        value: '4555',
      },
      {
        displayValue: '소사본동소사햇살어린이집',
        value: '4554',
      },
      {
        displayValue: '하안동풀꽃어린이집',
        value: '4553',
      },
      {
        displayValue: '사동참예지어린이집',
        value: '4552',
      },
      {
        displayValue: '풍동무지개숲어린이집',
        value: '4551',
      },
      {
        displayValue: '주엽동동화어린이집',
        value: '4550',
      },
      {
        displayValue: '신원동해피트리어린이집',
        value: '4549',
      },
      {
        displayValue: '성석동토마토어린이집',
        value: '4548',
      },
      {
        displayValue: '탄현동다온어린이집',
        value: '4547',
      },
      {
        displayValue: '덕이동현대그린애플어린이집',
        value: '4546',
      },
      {
        displayValue: '주엽동초록마을어린이집',
        value: '4545',
      },
      {
        displayValue: '조남동한신예다솜어린이집',
        value: '4544',
      },
      {
        displayValue: '정왕동새아름어린이집',
        value: '4543',
      },
      {
        displayValue: '망월동미사새싹어린이집',
        value: '4542',
      },
      {
        displayValue: '상현동꿈꾸는아이들어린이집',
        value: '4541',
      },
      {
        displayValue: '와동동위즈아이어린이집',
        value: '4540',
      },
      {
        displayValue: '다율동솜사탕어린이집',
        value: '4539',
      },
      {
        displayValue: '구래동싱글벙글어린이집',
        value: '4538',
      },
      {
        displayValue: '김포시그린코아어린이집',
        value: '4537',
      },
      {
        displayValue: '걸포동자이꿈터어린이집',
        value: '4536',
      },
      {
        displayValue: '풍무동꿈이있는신안어린이집',
        value: '4535',
      },
      {
        displayValue: '화성시부영나래어린이집',
        value: '4534',
      },
      {
        displayValue: '반송동펀샤인어린이집',
        value: '4533',
      },
      {
        displayValue: '화성시봉담행복어린이집',
        value: '4532',
      },
      {
        displayValue: '화성시신안아이슐레어린이집',
        value: '4531',
      },
      {
        displayValue: '화성시우리천사어린이집',
        value: '4530',
      },
      {
        displayValue: '덕계동에버빌어린이집',
        value: '4529',
      },
      {
        displayValue: '옥정동해나어린이집',
        value: '4528',
      },
      {
        displayValue: '신읍동쟈니어린이집',
        value: '4527',
      },
      {
        displayValue: '설운동짐랜드어린이집',
        value: '4526',
      },
      {
        displayValue: '포천시파란나라어린이집',
        value: '4525',
      },
      {
        displayValue: '포천시은혜아이어린이집',
        value: '4524',
      },
      {
        displayValue: '산성동아림어린이집',
        value: '4523',
      },
      {
        displayValue: '낭월동돋을별어린이집',
        value: '4522',
      },
      {
        displayValue: '둔산동아리솔어린이집',
        value: '4521',
      },
      {
        displayValue: '상대동풀꽃사랑어린이집',
        value: '4520',
      },
      {
        displayValue: '지족동피노키오어린이집',
        value: '4519',
      },
      {
        displayValue: '원내동한샘어린이집',
        value: '4518',
      },
      {
        displayValue: '일신동예솔어린이집',
        value: '4517',
      },
      {
        displayValue: '계산동신도어린이집',
        value: '4516',
      },
      {
        displayValue: '청라동꽃뜰어린이집',
        value: '4515',
      },
      {
        displayValue: '청라동예일어린이집',
        value: '4514',
      },
      {
        displayValue: '당하동예미지아라어린이집',
        value: '4513',
      },
      {
        displayValue: '효성동에코i숲어린이집',
        value: '4512',
      },
      {
        displayValue: '청주시중앙어린이집',
        value: '4511',
      },
      {
        displayValue: '백석동계룡리슈빌행복어린이집',
        value: '4510',
      },
      {
        displayValue: '두정동세빛어린이집',
        value: '4509',
      },
      {
        displayValue: '하안동하안꼬꼬마어린이집',
        value: '4490',
      },
      {
        displayValue: '뽀득테스트',
        value: '4457',
      },
      {
        displayValue: 'TEST',
        value: '4456',
      },
      {
        displayValue: '송도동누리어린이집',
        value: '4423',
      },
      {
        displayValue: '당동예쁜뜰어린이집',
        value: '4422',
      },
      {
        displayValue: '야동동9사단에버나인어린이집',
        value: '4390',
      },
      {
        displayValue: '교문동한가람어린이집',
        value: '4374',
      },
      {
        displayValue: '김포시힐스아이별어린이집',
        value: '4373',
      },
      {
        displayValue: '안성시별빛누리유치원',
        value: '4372',
      },
      {
        displayValue: '옥정동애플아이어린이집',
        value: '4371',
      },
      {
        displayValue: '공덕동삼성해뜰어린이집',
        value: '4370',
      },
      {
        displayValue: '능동구립능동꿈맞이어린이집',
        value: '4369',
      },
      {
        displayValue: '양벌동헨젤과그레텔어린이집',
        value: '4368',
      },
      {
        displayValue: '언남동개구쟁이들어린이집',
        value: '4367',
      },
      {
        displayValue: '신현동누리애뜰어린이집',
        value: '4366',
      },
      {
        displayValue: '감이동참맑은어린이집',
        value: '4365',
      },
      {
        displayValue: '수유동동화나라어린이집',
        value: '4295',
      },
      {
        displayValue: '미아동강북솔로몬어린이집',
        value: '4294',
      },
      {
        displayValue: '반포동영생유치원',
        value: '4293',
      },
      {
        displayValue: '주영어린이집',
        value: '4292',
      },
      {
        displayValue: '미아동해원어린이집',
        value: '4291',
      },
      {
        displayValue: '홍제동홍제성당유치원',
        value: '4290',
      },
      {
        displayValue: '수유동지성어린이집',
        value: '4289',
      },
      {
        displayValue: '장기동래미안꼬마숲어린이집',
        value: '4288',
      },
      {
        displayValue: '향동동향동해링턴어린이집',
        value: '4270',
      },
      {
        displayValue: '테스트뽀득유치원06',
        value: '4269',
      },
      {
        displayValue: '서초동서초구립래미안리더스원어린이집',
        value: '4268',
      },
      {
        displayValue: '부개3동푸른어린이집',
        value: '4267',
      },
      {
        displayValue: '테스트뽀득유치원04',
        value: '4266',
      },
      {
        displayValue: '노량진동사회적협동조합더자람교육공동체',
        value: '4255',
      },
      {
        displayValue: '목동일루어린이집',
        value: '4254',
      },
      {
        displayValue: '고덕동라이즈평택고덕어학원',
        value: '4253',
      },
      {
        displayValue: '중산동고양시립푸른하늘어린이집',
        value: '4252',
      },
      {
        displayValue: '당하동큰사랑어린이집',
        value: '4248',
      },
      {
        displayValue: '녹양동리틀꼬마등대어린이집',
        value: '4231',
      },
      {
        displayValue: '다산동다산꿈나무어린이집',
        value: '4229',
      },
      {
        displayValue: '화성시아이다솜어린이집',
        value: '4228',
      },
      {
        displayValue: '방배동남태령어린이집',
        value: '4179',
      },
      {
        displayValue: '신길동꿈나라어린이집',
        value: '4178',
      },
      {
        displayValue: '화성시에듀시티도담어린이집',
        value: '4177',
      },
      {
        displayValue: '이문동이문현대어린이집',
        value: '4176',
      },
      {
        displayValue: '화성시봉담행복어린이집',
        value: '4175',
      },
      {
        displayValue: '호원동한빛유치원',
        value: '4174',
      },
      {
        displayValue: '구의동예일어린이집',
        value: '4173',
      },
      {
        displayValue: '목동홀리게이트스콜라유치원',
        value: '4172',
      },
      {
        displayValue: '중동동백CL어학원',
        value: '4134',
      },
      {
        displayValue: '걸포동오스타어린이집',
        value: '4133',
      },
      {
        displayValue: '목동새롬어린이집',
        value: '4132',
      },
      {
        displayValue: '영통동한터어린이집',
        value: '4131',
      },
      {
        displayValue: '청량리동SDA삼육영어문화원',
        value: '4130',
      },
      {
        displayValue: '여월동엄지유치원',
        value: '4129',
      },
      {
        displayValue: '야탑동사무엘학교',
        value: '4128',
      },
      {
        displayValue: '청천동완두콩어린이집',
        value: '4127',
      },
      {
        displayValue: '토당동에벤에셀어린이집',
        value: '4126',
      },
      {
        displayValue: '옥정동별하어린이집',
        value: '3861',
      },
      {
        displayValue: '용강동용강어린이집',
        value: '3860',
      },
      {
        displayValue: '진관동숲속어린이집',
        value: '3859',
      },
      {
        displayValue: '테스트뽀득유치원03',
        value: '3858',
      },
      {
        displayValue: '선동아이랑어린이집(중복)',
        value: '3857',
      },
      {
        displayValue: '송도동웰키즈어린이집',
        value: '3856',
      },
      {
        displayValue: '북변동시립북변어린이집',
        value: '3855',
      },
      {
        displayValue: '양주시예하랑어린이집',
        value: '3854',
      },
      {
        displayValue: '고양동아기숲어린이집',
        value: '3853',
      },
      {
        displayValue: '광명동주원유치원',
        value: '3852',
      },
      {
        displayValue: '테스트뽀득유치원02',
        value: '3851',
      },
      {
        displayValue: '테스트뽀득유치원01',
        value: '3850',
      },
      {
        displayValue: '장곡동폴리어학원시흥장현캠퍼스주식회사',
        value: '3849',
      },
      {
        displayValue: '갈현동과천몬테소리어린이집',
        value: '3848',
      },
      {
        displayValue: '덕정동행전어린이집',
        value: '3847',
      },
      {
        displayValue: '반송동하하하어린이집',
        value: '3846',
      },
      {
        displayValue: '감이동감일행복어린이집',
        value: '3845',
      },
      {
        displayValue: '화성시사랑송송어린이집',
        value: '3844',
      },
      {
        displayValue: '산곡동나무엔어린이집',
        value: '3843',
      },
      {
        displayValue: '야당동라라캐슬어린이집',
        value: '3842',
      },
      {
        displayValue: '풍무동푸르지오리틀어린이집',
        value: '3841',
      },
      {
        displayValue: '부개동아이숲어린이집',
        value: '3840',
      },
      {
        displayValue: '마전동꿈이있는아이뜰어린이집',
        value: '3839',
      },
      {
        displayValue: '풍무동현대아이어린이집',
        value: '3838',
      },
      {
        displayValue: '박달동우일어린이집',
        value: '3837',
      },
      {
        displayValue: '오류동세라핌어린이집',
        value: '3836',
      },
      {
        displayValue: '덕계동우리두리어린이집',
        value: '3835',
      },
      {
        displayValue: '본동노량진교회유치원',
        value: '3834',
      },
      {
        displayValue: '덕계동꼬마둥이어린이집',
        value: '3833',
      },
      {
        displayValue: '소사본동소사대장어린이집',
        value: '3832',
      },
      {
        displayValue: '벽제동숲속삼성어린이집',
        value: '3831',
      },
      {
        displayValue: '장곡동세종유치원',
        value: '3830',
      },
      {
        displayValue: '이촌동강변유치원',
        value: '3829',
      },
      {
        displayValue: '김포시청아어린이집',
        value: '3828',
      },
      {
        displayValue: '산곡동팰리스어린이집',
        value: '3827',
      },
      {
        displayValue: '산곡동이바유치원',
        value: '3826',
      },
      {
        displayValue: '구로동새하늘어린이집',
        value: '3825',
      },
      {
        displayValue: '금정동느티나무어린이집',
        value: '3824',
      },
      {
        displayValue: '덕계동현진자연애어린이집',
        value: '3823',
      },
      {
        displayValue: '세곡동구립엔젤데시앙어린이집',
        value: '3822',
      },
      {
        displayValue: '능동삐삐어린이집',
        value: '3821',
      },
      {
        displayValue: '성복동새봄아이어린이집',
        value: '3820',
      },
      {
        displayValue: '풍납동파란나라어린이집',
        value: '3819',
      },
      {
        displayValue: '풍납동파란어린이집',
        value: '3818',
      },
      {
        displayValue: '고덕동시립고덕디에트르어린이집',
        value: '3817',
      },
      {
        displayValue: '소사동(재)성베네딕도수녀회분도유치원',
        value: '3816',
      },
      {
        displayValue: '풍덕천동아이와별어린이집',
        value: '3815',
      },
      {
        displayValue: '영덕동시립흥덕어린이집',
        value: '3814',
      },
      {
        displayValue: '공릉동동산어린이집',
        value: '3813',
      },
      {
        displayValue: '시흥동동일유치원',
        value: '3812',
      },
      {
        displayValue: '별내동시립별꽃어린이집',
        value: '3811',
      },
      {
        displayValue: '신장동미소어린이집(중복)',
        value: '3810',
      },
      {
        displayValue: '풍무동시립풍무푸르지오어린이집',
        value: '3809',
      },
      {
        displayValue: '장안동다사랑어린이집',
        value: '3808',
      },
      {
        displayValue: '상현동바움슐레어린이집',
        value: '3807',
      },
      {
        displayValue: '남양주시우성쑥쑥어린이집',
        value: '3806',
      },
      {
        displayValue: '성수동숲아이쉼뜰',
        value: '3805',
      },
      {
        displayValue: '저동서울유지재단영락유치원',
        value: '3804',
      },
      {
        displayValue: '송동은솔어린이집',
        value: '3803',
      },
      {
        displayValue: '새솔동청아키즈어린이집',
        value: '3802',
      },
      {
        displayValue: '장암동하얀나라어린이집',
        value: '3801',
      },
      {
        displayValue: '구의동아이터어린이집',
        value: '3800',
      },
      {
        displayValue: '방이동이루리어린이집',
        value: '3799',
      },
      {
        displayValue: '반포동아이가르텐서초반포',
        value: '3798',
      },
      {
        displayValue: '신사동강남잉글리쉬아카데미',
        value: '3797',
      },
      {
        displayValue: '등촌동구립아리스타어린이집',
        value: '3796',
      },
      {
        displayValue: '삼숭동우정어린이집',
        value: '3795',
      },
      {
        displayValue: '옥정동공립꿈빛나래어린이집',
        value: '3794',
      },
      {
        displayValue: '옥정동공립유림숲어린이집',
        value: '3793',
      },
      {
        displayValue: '구의동리틀지니어스어린이집',
        value: '3792',
      },
      {
        displayValue: '강일동라임어린이집',
        value: '3791',
      },
      {
        displayValue: '당하동국공립아라대성큰별어린이집',
        value: '3790',
      },
      {
        displayValue: '소하동꿀단지어린이집',
        value: '3789',
      },
      {
        displayValue: '고암동지엘유치원',
        value: '3788',
      },
      {
        displayValue: '행신동미카엘어린이집',
        value: '3787',
      },
      {
        displayValue: '정릉동산들어린이집',
        value: '3786',
      },
      {
        displayValue: '마전동재은유치원',
        value: '3785',
      },
      {
        displayValue: '(중복)판교동상록i어린이집',
        value: '3784',
      },
      {
        displayValue: '영통동보명어린이집',
        value: '3783',
      },
      {
        displayValue: '원당동더베뉴예뜰어린이집',
        value: '3782',
      },
      {
        displayValue: '경서동제일퍼스트어린이집',
        value: '3781',
      },
      {
        displayValue: '신정동구립그린나래어린이집',
        value: '3780',
      },
      {
        displayValue: '창곡동이엘에이케이어학원',
        value: '3779',
      },
      {
        displayValue: '창곡동알티오라위례',
        value: '3778',
      },
      {
        displayValue: '운서동초롱유치원',
        value: '3777',
      },
      {
        displayValue: '운서동무지개유치원',
        value: '3776',
      },
      {
        displayValue: '도곡동키비스키즈잉글리쉬',
        value: '3775',
      },
      {
        displayValue: '서현동초록나무어린이집',
        value: '3774',
      },
      {
        displayValue: '화성시참맑은어린이집',
        value: '3773',
      },
      {
        displayValue: '경안동광주성모유치원',
        value: '3772',
      },
      {
        displayValue: '내발산동현대i어린이집',
        value: '3771',
      },
      {
        displayValue: '남양주시영진햇살어린이집',
        value: '3770',
      },
      {
        displayValue: '송도동그린나래어린이집',
        value: '3769',
      },
      {
        displayValue: '옥정동킨더어린이집',
        value: '3768',
      },
      {
        displayValue: '다산동산들다산어린이집',
        value: '3767',
      },
      {
        displayValue: '동작동현대힐스어린이집',
        value: '3766',
      },
      {
        displayValue: '옥정동도담애어린이집',
        value: '3765',
      },
      {
        displayValue: '화성시꿈누리어린이집',
        value: '3764',
      },
      {
        displayValue: '신월동세진어린이집',
        value: '3763',
      },
      {
        displayValue: '방배동킹스타운서초어학원',
        value: '3762',
      },
      {
        displayValue: '남가좌동연유치원',
        value: '3761',
      },
      {
        displayValue: '부평동한사랑어린이집',
        value: '3760',
      },
      {
        displayValue: '양주시소중한어린이집',
        value: '3759',
      },
      {
        displayValue: '안나유치원',
        value: '3758',
      },
      {
        displayValue: '(중복)고양동키즈스타어린이집',
        value: '3757',
      },
      {
        displayValue: '인창동금초롱어린이집',
        value: '3756',
      },
      {
        displayValue: '양주시예원어린이집',
        value: '3755',
      },
      {
        displayValue: '면목동영재사관어린이집',
        value: '3754',
      },
      {
        displayValue: '가정동국공립루원지웰푸르지오어린이집',
        value: '3753',
      },
      {
        displayValue: '논현동GIA어학원별관',
        value: '3752',
      },
      {
        displayValue: '정왕동유천어린이집',
        value: '3751',
      },
      {
        displayValue: '신곡동새봄어린이집',
        value: '3750',
      },
      {
        displayValue: '용현동리틀귀염둥이어린이집',
        value: '3749',
      },
      {
        displayValue: '신곡동자연아이어린이집',
        value: '3748',
      },
      {
        displayValue: '공릉동예뜨랑어린이집',
        value: '3747',
      },
      {
        displayValue: '춘의동도미니꼬애덕어린이집',
        value: '3746',
      },
      {
        displayValue: '어룡동햇님어린이집',
        value: '3745',
      },
      {
        displayValue: '운서동해님나라유치원',
        value: '3744',
      },
      {
        displayValue: '녹번동유정유치원',
        value: '3743',
      },
      {
        displayValue: '해님나라유치원',
        value: '3742',
      },
      {
        displayValue: '영등포동햇살가득어린이집',
        value: '3741',
      },
      {
        displayValue: '병점동숲어린이집',
        value: '3740',
      },
      {
        displayValue: '정왕동미키어린이집',
        value: '3739',
      },
      {
        displayValue: '원천동레이크시티어린이집',
        value: '3738',
      },
      {
        displayValue: '염리동주식회사프롤아카데미',
        value: '3737',
      },
      {
        displayValue: '평택시알콩달콩어린이집',
        value: '3736',
      },
      {
        displayValue: '봉천동배꽃유치원',
        value: '3735',
      },
      {
        displayValue: '운양동좋은어린이집',
        value: '3734',
      },
      {
        displayValue: '한남동밤비니어학원',
        value: '3733',
      },
      {
        displayValue: '신대방동요요유치원',
        value: '3732',
      },
      {
        displayValue: '구로동참빛어린이집',
        value: '3731',
      },
      {
        displayValue: '부평동유준호어린이집 테스트',
        value: '3730',
      },
      {
        displayValue: '삼성동반짝반짝어린이집',
        value: '3729',
      },
      {
        displayValue: '삼성동윌리엄유치원',
        value: '3728',
      },
      {
        displayValue: '삼성동test어린이집',
        value: '3727',
      },
      {
        displayValue: '삼성동뽀득유치원',
        value: '3726',
      },
      {
        displayValue: '광주시반딧불이어린이집',
        value: '3725',
      },
      {
        displayValue: '간석동키즈엘어린이집',
        value: '3724',
      },
      {
        displayValue: '철산동꿈동산어린이집',
        value: '3723',
      },
      {
        displayValue: '정왕동아기천사어린이집',
        value: '3722',
      },
      {
        displayValue: '옥정동에스클래스어린이집',
        value: '3721',
      },
      {
        displayValue: '청덕동예봄어린이집',
        value: '3720',
      },
      {
        displayValue: '상갈동축복어린이집',
        value: '3719',
      },
      {
        displayValue: '암사동하늘숲어린이집',
        value: '3718',
      },
      {
        displayValue: '화성시에듀파크도담어린이집',
        value: '3717',
      },
      {
        displayValue: '가정동SK라온어린이집',
        value: '3716',
      },
      {
        displayValue: '정왕동꼬마천사어린이집',
        value: '3715',
      },
      {
        displayValue: '배곧동센텀다하어린이집',
        value: '3714',
      },
      {
        displayValue: '고읍동키즈빌어린이집',
        value: '3713',
      },
      {
        displayValue: '시흥동시흥삐아제어린이집',
        value: '3712',
      },
      {
        displayValue: '양평동한신또래어린이집',
        value: '3711',
      },
      {
        displayValue: '양재동은혜어린이집',
        value: '3710',
      },
      {
        displayValue: '길음동이삭어린이집',
        value: '3709',
      },
      {
        displayValue: '백석동캥거루어린이집',
        value: '3708',
      },
      {
        displayValue: '파주시굿모닝힐어린이집',
        value: '3707',
      },
      {
        displayValue: '당하동예미지리틀어린이집',
        value: '3706',
      },
      {
        displayValue: '가좌동아이맘어린이집',
        value: '3705',
      },
      {
        displayValue: '가능동푸른숲어린이집',
        value: '3704',
      },
      {
        displayValue: '자양동한라어린이집',
        value: '3703',
      },
      {
        displayValue: '광주시아이빛나어린이집',
        value: '3702',
      },
      {
        displayValue: '십정동성아유치원',
        value: '3701',
      },
      {
        displayValue: '가양동구립즐거운어린이집',
        value: '3700',
      },
      {
        displayValue: '내손동래미안해솔어린이집',
        value: '3699',
      },
      {
        displayValue: '봉천동구립마루어린이집',
        value: '3698',
      },
      {
        displayValue: '보라동딸기어린이집',
        value: '3697',
      },
      {
        displayValue: '삼정동나래어린이집',
        value: '3696',
      },
      {
        displayValue: '옥정동별다솜어린이집',
        value: '3695',
      },
      {
        displayValue: '상현동위니어린이집',
        value: '3694',
      },
      {
        displayValue: '방화동더조은영재어린이집',
        value: '3693',
      },
      {
        displayValue: '신내동성애어린이집',
        value: '3692',
      },
      {
        displayValue: '갈매동숲속어린이집',
        value: '3691',
      },
      {
        displayValue: '인창동꿈나무어린이집',
        value: '3690',
      },
      {
        displayValue: '가정동봄봄어린이집',
        value: '3689',
      },
      {
        displayValue: '산곡동주안어린이집',
        value: '3688',
      },
      {
        displayValue: '노량진동시현유치원',
        value: '3687',
      },
      {
        displayValue: '금곡동예쁨사랑어린이집',
        value: '3686',
      },
      {
        displayValue: '안녕동신나는어린이집',
        value: '3685',
      },
      {
        displayValue: '야동동꿈나래어린이집',
        value: '3684',
      },
      {
        displayValue: '신정동세화유치원',
        value: '3683',
      },
      {
        displayValue: '행신동호수유치원',
        value: '3682',
      },
      {
        displayValue: '염창동염창누리봄어린이집',
        value: '3681',
      },
      {
        displayValue: '양평동늘푸른어린이집',
        value: '3680',
      },
      {
        displayValue: '당하동베베어린이집',
        value: '3679',
      },
      {
        displayValue: '방배동아가야어린이집',
        value: '3678',
      },
      {
        displayValue: '불광동별산솔어린이집',
        value: '3677',
      },
      {
        displayValue: '산곡동경남몬테소리가정어린이집',
        value: '3676',
      },
      {
        displayValue: '정자동동아아이크니어린이집',
        value: '3675',
      },
      {
        displayValue: '가양동장미유치원',
        value: '3674',
      },
      {
        displayValue: '풍무동강아지똥과민들레어린이집',
        value: '3673',
      },
      {
        displayValue: '화곡동쁘띠아미에꼴어린이집',
        value: '3672',
      },
      {
        displayValue: '관산동준성자연유치원',
        value: '3671',
      },
      {
        displayValue: '향동동좋은나무어린이집',
        value: '3670',
      },
      {
        displayValue: '신정동라이즈목동어학원',
        value: '3669',
      },
      {
        displayValue: '장안동아이세상어린이집',
        value: '3668',
      },
      {
        displayValue: '반송동어울림어린이집',
        value: '3667',
      },
      {
        displayValue: '사리현동푸른아이세상어린이집',
        value: '3666',
      },
      {
        displayValue: '신천동시립신천어린이집',
        value: '3665',
      },
      {
        displayValue: '면목동봄내어린이집',
        value: '3664',
      },
      {
        displayValue: '신정동구립해바라기어린이집',
        value: '3663',
      },
      {
        displayValue: '동패동사무엘어린이집',
        value: '3662',
      },
      {
        displayValue: '신원동아이숲어린이집',
        value: '3661',
      },
      {
        displayValue: '교문동자연어린이집',
        value: '3660',
      },
      {
        displayValue: '외삼미동더샵아이꿈터어린이집',
        value: '3659',
      },
      {
        displayValue: '다산동소담어린이집',
        value: '3658',
      },
      {
        displayValue: '동삭동꼬마숲어린이집',
        value: '3657',
      },
      {
        displayValue: '주엽동푸른잔디어린이집',
        value: '3656',
      },
      {
        displayValue: '주엽동바른어린이집',
        value: '3655',
      },
      {
        displayValue: '고등동해피키즈어린이집',
        value: '3654',
      },
      {
        displayValue: '대야미동아이꿈어린이집',
        value: '3653',
      },
      {
        displayValue: '남양주시시립라온하늘어린이집',
        value: '3652',
      },
      {
        displayValue: '자양동민들레어린이집',
        value: '3651',
      },
      {
        displayValue: '야탑동하나아이어린이집',
        value: '3650',
      },
      {
        displayValue: '야탑동하나어린이집',
        value: '3649',
      },
      {
        displayValue: '반송동새한빛어린이집',
        value: '3648',
      },
      {
        displayValue: '신내동대건어린이집',
        value: '3647',
      },
      {
        displayValue: '병점동꿈지니어린이집',
        value: '3646',
      },
      {
        displayValue: '동삭동리틀토리어린이집',
        value: '3645',
      },
      {
        displayValue: '평택시하늘숲어린이집',
        value: '3644',
      },
      {
        displayValue: '염창동동광어린이집',
        value: '3643',
      },
      {
        displayValue: '염창동현대어린이집',
        value: '3642',
      },
      {
        displayValue: '능동예찬들어린이집',
        value: '3641',
      },
      {
        displayValue: '외삼미동더샵다온어린이집',
        value: '3640',
      },
      {
        displayValue: '화성시꼬마아띠어린이집',
        value: '3639',
      },
      {
        displayValue: '양산동동산어린이집',
        value: '3638',
      },
      {
        displayValue: '부산동해맑은어린이집',
        value: '3637',
      },
      {
        displayValue: '병점동생각이크는숲어린이집',
        value: '3636',
      },
      {
        displayValue: '옥정동모드니어린이집',
        value: '3635',
      },
      {
        displayValue: '능동메이루즈어린이집',
        value: '3634',
      },
      {
        displayValue: '옥정동토리어린이집',
        value: '3633',
      },
      {
        displayValue: '하안동숲속나라어린이집',
        value: '3632',
      },
      {
        displayValue: '부곡동왕자와공주어린이집',
        value: '3631',
      },
      {
        displayValue: '비전동효성잼잼어린이집',
        value: '3630',
      },
      {
        displayValue: '오산동산새소리어린이집',
        value: '3629',
      },
      {
        displayValue: '망포동자이어린이집',
        value: '3628',
      },
      {
        displayValue: '옥정동노르웨이어린이집',
        value: '3627',
      },
      {
        displayValue: '화성시키움어린이집',
        value: '3626',
      },
      {
        displayValue: '산곡동귀여운어린이집',
        value: '3625',
      },
      {
        displayValue: '신월동두산로다어린이집',
        value: '3624',
      },
      {
        displayValue: '신곡동미소뜰어린이집',
        value: '3623',
      },
      {
        displayValue: '칠원동평택리틀엔젤어린이집',
        value: '3622',
      },
      {
        displayValue: '신월동예다인어린이집',
        value: '3621',
      },
      {
        displayValue: '평택시초록별어린이집',
        value: '3620',
      },
      {
        displayValue: '휘경동다솔어린이집',
        value: '3619',
      },
      {
        displayValue: '도화동밀알유치원',
        value: '3618',
      },
      {
        displayValue: '임학동밀알유치원',
        value: '3617',
      },
      {
        displayValue: '철산동열린어린이집',
        value: '3616',
      },
      {
        displayValue: '풍무동푸르지오베베어린이집',
        value: '3615',
      },
      {
        displayValue: '염리동정님유치원',
        value: '3614',
      },
      {
        displayValue: '송월동1가송월어린이집',
        value: '3613',
      },
      {
        displayValue: '옥정동한별어린이집',
        value: '3612',
      },
      {
        displayValue: '옥정동포도나무어린이집',
        value: '3611',
      },
      {
        displayValue: '송산동한승열린어린이집',
        value: '3610',
      },
      {
        displayValue: '청계동꼬마숲아이누리어린이집',
        value: '3609',
      },
      {
        displayValue: '화성시사강어린이집',
        value: '3608',
      },
      {
        displayValue: '신림동구립소하어린이집',
        value: '3607',
      },
      {
        displayValue: '고등동늘푸른어린이집',
        value: '3606',
      },
      {
        displayValue: '삼숭동초록나무어린이집',
        value: '3605',
      },
      {
        displayValue: '길음동래미안어린이집',
        value: '3604',
      },
      {
        displayValue: '동삭동자이해오름어린이집',
        value: '3603',
      },
      {
        displayValue: '오전동예쁜뜰어린이집',
        value: '3602',
      },
      {
        displayValue: '합정동꼬마천사어린이집',
        value: '3601',
      },
      {
        displayValue: '장암동소나무어린이집',
        value: '3600',
      },
      {
        displayValue: '자양동지안어린이집',
        value: '3599',
      },
      {
        displayValue: '덕은동덕은한강어린이집',
        value: '3598',
      },
      {
        displayValue: '송현동꼬마대통령어린이집',
        value: '3597',
      },
      {
        displayValue: '잠원동서초구립반포르엘2차어린이집',
        value: '3596',
      },
      {
        displayValue: '당하동국공립아라신안꿈꾸는어린이집',
        value: '3595',
      },
      {
        displayValue: '성사동숲체험상아어린이집',
        value: '3594',
      },
      {
        displayValue: '산곡동대광하늘별어린이집',
        value: '3593',
      },
      {
        displayValue: '다산동롯데큰꿈어린이집',
        value: '3592',
      },
      {
        displayValue: '중산동딸기사랑어린이집',
        value: '3591',
      },
      {
        displayValue: '다산동다산새싹어린이집',
        value: '3590',
      },
      {
        displayValue: '호평동꿀벌어린이집',
        value: '3589',
      },
      {
        displayValue: '운중동새봄어린이집',
        value: '3588',
      },
      {
        displayValue: '송내동아이맘어린이집',
        value: '3587',
      },
      {
        displayValue: '상현동쵸콜렛어린이집',
        value: '3586',
      },
      {
        displayValue: '구로동아이나라어린이집',
        value: '3585',
      },
      {
        displayValue: '화곡동숲속나라어린이집',
        value: '3584',
      },
      {
        displayValue: '상현동예꿈어린이집',
        value: '3583',
      },
      {
        displayValue: '구미동하얀한우리어린이집',
        value: '3582',
      },
      {
        displayValue: '구산동꿈꾸는어린이집',
        value: '3581',
      },
      {
        displayValue: '불광동행복한예향어린이집',
        value: '3580',
      },
      {
        displayValue: '반정동앨리스캐슬어린이집',
        value: '3579',
      },
      {
        displayValue: '상봉동점프어린이집',
        value: '3578',
      },
      {
        displayValue: '운양동김포한강SLP어학원',
        value: '3577',
      },
      {
        displayValue: '벽제동별생각어린이집',
        value: '3576',
      },
      {
        displayValue: '김포시금빛어린이집',
        value: '3575',
      },
      {
        displayValue: '양주시노블키즈유치원',
        value: '3574',
      },
      {
        displayValue: '동산동효경어린이집',
        value: '3573',
      },
      {
        displayValue: '가정동영아나라어린이집',
        value: '3572',
      },
      {
        displayValue: '세류동햇님유치원',
        value: '3571',
      },
      {
        displayValue: '세류동햇님어린이집',
        value: '3570',
      },
      {
        displayValue: '창4동청담클루빌어학원',
        value: '3569',
      },
      {
        displayValue: '덕은동한강새싹어린이집',
        value: '3568',
      },
      {
        displayValue: '가양동우리곰유치원',
        value: '3567',
      },
      {
        displayValue: '야탑동참사랑어린이집',
        value: '3566',
      },
      {
        displayValue: '반포동반포어린이집',
        value: '3565',
      },
      {
        displayValue: '홍익동성심유치원',
        value: '3564',
      },
      {
        displayValue: '대조동예원사랑어린이집',
        value: '3563',
      },
      {
        displayValue: '당하동신안별어린이집',
        value: '3562',
      },
      {
        displayValue: '장기동엔젤사랑어린이집',
        value: '3561',
      },
      {
        displayValue: '신현동한가람어린이집',
        value: '3560',
      },
      {
        displayValue: '신월동해나라어린이집',
        value: '3559',
      },
      {
        displayValue: '봉천동구립도담어린이집',
        value: '3558',
      },
      {
        displayValue: '미아동파머스어학원',
        value: '3557',
      },
      {
        displayValue: '고암동에코비주원어린이집',
        value: '3556',
      },
      {
        displayValue: '길음동별초롱어린이집',
        value: '3555',
      },
      {
        displayValue: '이의동해든어린이집',
        value: '3554',
      },
      {
        displayValue: '반월동자이늘품어린이집',
        value: '3553',
      },
      {
        displayValue: '심곡동부천키움어린이집',
        value: '3552',
      },
      {
        displayValue: '고등동다예린어린이집',
        value: '3551',
      },
      {
        displayValue: '산곡동소담어린이집',
        value: '3550',
      },
      {
        displayValue: '사우동시립사우아이파크어린이집',
        value: '3549',
      },
      {
        displayValue: '염창동동산어린이집',
        value: '3548',
      },
      {
        displayValue: '화곡동썬에듀스쿨어린이집',
        value: '3547',
      },
      {
        displayValue: '불로동신나는대림어린이집',
        value: '3546',
      },
      {
        displayValue: '송도동예원어린이집',
        value: '3545',
      },
      {
        displayValue: '불로동또래모아어린이집',
        value: '3544',
      },
      {
        displayValue: '망월동강변푸르지오어린이집',
        value: '3543',
      },
      {
        displayValue: '산본동군포정상어학원',
        value: '3542',
      },
      {
        displayValue: '장위동래미안베베어린이집',
        value: '3541',
      },
      {
        displayValue: '야탑동은정유치원',
        value: '3540',
      },
      {
        displayValue: '삼평동푸른숲어린이집',
        value: '3539',
      },
      {
        displayValue: '용현동우정어린이집',
        value: '3538',
      },
      {
        displayValue: '길음동까꿍어린이집',
        value: '3537',
      },
      {
        displayValue: '덕계동햇살나무어린이집',
        value: '3536',
      },
      {
        displayValue: '우만동봄빛어린이집',
        value: '3535',
      },
      {
        displayValue: '논현동온누리어린이집',
        value: '3534',
      },
      {
        displayValue: '중산동늘사랑숲어린이집',
        value: '3533',
      },
      {
        displayValue: '김포시산들어린이집',
        value: '3532',
      },
      {
        displayValue: '철산동자이숲어린이집',
        value: '3531',
      },
      {
        displayValue: '고잔동아름자리어린이집',
        value: '3530',
      },
      {
        displayValue: '흑석동소망유치원',
        value: '3529',
      },
      {
        displayValue: '응암동서문교회부설어린이집',
        value: '3528',
      },
      {
        displayValue: '갈매동뜰에빛어린이집',
        value: '3527',
      },
      {
        displayValue: '남양주시예당브래뉴어린이집',
        value: '3526',
      },
      {
        displayValue: '호원동상아어린이집',
        value: '3525',
      },
      {
        displayValue: '길음동미예뜰어린이집',
        value: '3524',
      },
      {
        displayValue: '구래동아이행복어린이집',
        value: '3523',
      },
      {
        displayValue: '망포동키즈뜰어린이집',
        value: '3522',
      },
      {
        displayValue: '장안동하은어린이집',
        value: '3521',
      },
      {
        displayValue: '고잔동은물키드어린이집',
        value: '3520',
      },
      {
        displayValue: '신정동목성유치원',
        value: '3519',
      },
      {
        displayValue: '문원동숲속나라어린이집',
        value: '3518',
      },
      {
        displayValue: '금호동1가트리니엘성동본원',
        value: '3517',
      },
      {
        displayValue: '구의3동좋은어린이집',
        value: '3516',
      },
      {
        displayValue: '구의동프라임유치원',
        value: '3515',
      },
      {
        displayValue: '홍은동경복유치원',
        value: '3514',
      },
      {
        displayValue: '홍제동현대경복유치원',
        value: '3513',
      },
      {
        displayValue: '개봉동꿈나래어린이집',
        value: '3512',
      },
      {
        displayValue: '원당동리버파크라온어린이집',
        value: '3511',
      },
      {
        displayValue: '남양주시해피아이랑어린이집',
        value: '3510',
      },
      {
        displayValue: '소사동고운어린이집',
        value: '3509',
      },
      {
        displayValue: '운중동로제비앙어린이집',
        value: '3508',
      },
      {
        displayValue: '가산동시내유치원',
        value: '3507',
      },
      {
        displayValue: '김포시힐스종달새어린이집',
        value: '3506',
      },
      {
        displayValue: '동산동호반레아어린이집',
        value: '3505',
      },
      {
        displayValue: '외삼미동두드림어린이집',
        value: '3504',
      },
      {
        displayValue: '풍덕천동태영어린이집',
        value: '3503',
      },
      {
        displayValue: '반월동누리봄어린이집',
        value: '3502',
      },
      {
        displayValue: '민락동샘터열매유치원',
        value: '3501',
      },
      {
        displayValue: '목동원일유치원',
        value: '3500',
      },
      {
        displayValue: '돈암동동부어린이집',
        value: '3499',
      },
      {
        displayValue: '기산동솔샘어린이집',
        value: '3498',
      },
      {
        displayValue: '명일동꿈쟁이어린이집',
        value: '3497',
      },
      {
        displayValue: '선동아이랑어린이집',
        value: '3496',
      },
      {
        displayValue: '상현동동화숲어린이집',
        value: '3495',
      },
      {
        displayValue: '명일동참빛어린이집',
        value: '3494',
      },
      {
        displayValue: '의정부동생각자람어린이집',
        value: '3493',
      },
      {
        displayValue: '금오동꿈이랑어린이집',
        value: '3492',
      },
      {
        displayValue: '계산동한솔어린이집',
        value: '3491',
      },
      {
        displayValue: '장지동동탄자연앤어린이집',
        value: '3490',
      },
      {
        displayValue: '장안동동대문구민체육센터유아체능단',
        value: '3489',
      },
      {
        displayValue: '남가좌동재재어린이집',
        value: '3488',
      },
      {
        displayValue: '용인시베네치아어린이집',
        value: '3487',
      },
      {
        displayValue: '죽전동동화사랑어린이집',
        value: '3486',
      },
      {
        displayValue: '쌍문동둥근달어린이집',
        value: '3485',
      },
      {
        displayValue: '망월동미사예랑어린이집',
        value: '3484',
      },
      {
        displayValue: '영천동즐거운라라어린이집',
        value: '3483',
      },
      {
        displayValue: '영천동아이키즈유어린이집',
        value: '3482',
      },
      {
        displayValue: '영천동파크천사어린이집',
        value: '3481',
      },
      {
        displayValue: '영천동한결어린이집',
        value: '3480',
      },
      {
        displayValue: '화성시아기둥지어린이집',
        value: '3479',
      },
      {
        displayValue: '풍동나무둥지어린이집',
        value: '3478',
      },
      {
        displayValue: '신사동하늘어린이집',
        value: '3477',
      },
      {
        displayValue: '상계동성광어린이집',
        value: '3476',
      },
      {
        displayValue: '상계동아트성광어린이집',
        value: '3475',
      },
      {
        displayValue: '화성시사랑채움어린이집',
        value: '3474',
      },
      {
        displayValue: '망포동한솔이튼키즈어린이집',
        value: '3473',
      },
      {
        displayValue: '인계동동화사랑어린이집',
        value: '3472',
      },
      {
        displayValue: '기산동블루키즈어린이집',
        value: '3471',
      },
      {
        displayValue: '화성시포근히어린이집',
        value: '3470',
      },
      {
        displayValue: '망포동현대힐스테이트어린이집',
        value: '3469',
      },
      {
        displayValue: '죽전동사임당어린이집',
        value: '3468',
      },
      {
        displayValue: '고림동삼정아이세상어린이집',
        value: '3467',
      },
      {
        displayValue: '반송동성원어린이집',
        value: '3466',
      },
      {
        displayValue: '산황동큰솔숲유치원',
        value: '3465',
      },
      {
        displayValue: '산척동아름솔어린이집',
        value: '3464',
      },
      {
        displayValue: '병방동상아유치원',
        value: '3463',
      },
      {
        displayValue: '중계동친구사이어린이집',
        value: '3462',
      },
      {
        displayValue: '강일동아이세움어린이집',
        value: '3461',
      },
      {
        displayValue: '다산동행복한우리어린이집',
        value: '3460',
      },
      {
        displayValue: '고덕동베베키즈어린이집',
        value: '3459',
      },
      {
        displayValue: '가양동강서한강자이어린이집',
        value: '3458',
      },
      {
        displayValue: '구로동보석어린이집',
        value: '3457',
      },
      {
        displayValue: '등촌동등현유치원',
        value: '3456',
      },
      {
        displayValue: '사당동자이어린이집',
        value: '3455',
      },
      {
        displayValue: '방배동구립성분도어린이집',
        value: '3454',
      },
      {
        displayValue: '신사동꿈동이어린이집',
        value: '3453',
      },
      {
        displayValue: '신림동한별유치원',
        value: '3452',
      },
      {
        displayValue: '서빙고동예꿈어린이집',
        value: '3451',
      },
      {
        displayValue: '방배동서리풀글로벌아카데미학원',
        value: '3450',
      },
      {
        displayValue: '명일동푸른숲어린이집',
        value: '3449',
      },
      {
        displayValue: '정자동한솔청구어린이집',
        value: '3448',
      },
      {
        displayValue: '중앙동봄샘캐슬어린이집',
        value: '3447',
      },
      {
        displayValue: '망월동미사아이자람어린이집',
        value: '3446',
      },
      {
        displayValue: '이매동조은어린이집',
        value: '3445',
      },
      {
        displayValue: '당하동아라새봄어린이집',
        value: '3444',
      },
      {
        displayValue: '성수동구립성수아이파크어린이집',
        value: '3443',
      },
      {
        displayValue: '운양동키즈홀릭어린이집',
        value: '3442',
      },
      {
        displayValue: '금광동천사어린이집',
        value: '3441',
      },
      {
        displayValue: '상일동강동빅스맘어린이집',
        value: '3440',
      },
      {
        displayValue: '성내동리틀예홍어린이집',
        value: '3439',
      },
      {
        displayValue: '원당동미소어린이집',
        value: '3438',
      },
      {
        displayValue: '용두동힐사이드컬리지잇어학원',
        value: '3437',
      },
      {
        displayValue: '가좌동일산아이사랑어린이집',
        value: '3436',
      },
      {
        displayValue: '반포동서초구립반포1동주민센터어린이집',
        value: '3435',
      },
      {
        displayValue: '토당동피앤피어린이집',
        value: '3434',
      },
      {
        displayValue: '목동금강자연어린이집',
        value: '3433',
      },
      {
        displayValue: '원문동과천노들유치원',
        value: '3432',
      },
      {
        displayValue: '여의도동성요셉유치원',
        value: '3431',
      },
      {
        displayValue: '상도동행복유치원',
        value: '3430',
      },
      {
        displayValue: '반포동서초SLP',
        value: '3429',
      },
      {
        displayValue: '운양동위즈아일랜드',
        value: '3428',
      },
      {
        displayValue: '운양동프랜시스파커',
        value: '3427',
      },
      {
        displayValue: '대림동큰나무유치원',
        value: '3426',
      },
      {
        displayValue: '이매동이매진어린이집',
        value: '3425',
      },
      {
        displayValue: '권선동현대숲어린이집',
        value: '3424',
      },
      {
        displayValue: '동산동MBN샛별어린이집',
        value: '3423',
      },
      {
        displayValue: '오산동운암비테에어린이집',
        value: '3422',
      },
      {
        displayValue: '사우동키즈헤럴드어학원',
        value: '3421',
      },
      {
        displayValue: '원곡동벽산조앤아이어린이집',
        value: '3420',
      },
      {
        displayValue: '신월동우리캐슬어린이집',
        value: '3419',
      },
      {
        displayValue: '판교동판교분더바움숲어린이집',
        value: '3418',
      },
      {
        displayValue: '양평동5가작은또래어린이집',
        value: '3417',
      },
      {
        displayValue: '선동예랑어린이집',
        value: '3416',
      },
      {
        displayValue: '영천동영천미소어린이집',
        value: '3415',
      },
      {
        displayValue: '석우동유정어린이집',
        value: '3414',
      },
      {
        displayValue: '정왕동에셀나무어린이집',
        value: '3413',
      },
      {
        displayValue: '포천시신광새싹어린이집',
        value: '3412',
      },
      {
        displayValue: '갈매동수피아어린이집',
        value: '3411',
      },
      {
        displayValue: '정왕동아이예뻐어린이집',
        value: '3410',
      },
      {
        displayValue: '반송동라온어린이집',
        value: '3409',
      },
      {
        displayValue: '신천동맘앤아이어린이집',
        value: '3408',
      },
      {
        displayValue: '화곡동다해영재어린이집',
        value: '3407',
      },
      {
        displayValue: '사당동성진어린이집',
        value: '3406',
      },
      {
        displayValue: '부개동청담유치원',
        value: '3405',
      },
      {
        displayValue: '천천동성민프리미어스쿨',
        value: '3404',
      },
      {
        displayValue: '풍무동아기궁전어린이집',
        value: '3403',
      },
      {
        displayValue: '다산동별하어린이집',
        value: '3402',
      },
      {
        displayValue: '중화동은성유치원',
        value: '3401',
      },
      {
        displayValue: '신천동에이비시어린이집',
        value: '3400',
      },
      {
        displayValue: '신천동올리브어린이집',
        value: '3399',
      },
      {
        displayValue: '명일동해랑어린이집',
        value: '3398',
      },
      {
        displayValue: '잠원동서초구립반포르엘어린이집',
        value: '3397',
      },
      {
        displayValue: '다남동산들유치원',
        value: '3396',
      },
      {
        displayValue: '포천시미래클어린이집',
        value: '3395',
      },
      {
        displayValue: '문정동키즈크레용어린이집',
        value: '3394',
      },
      {
        displayValue: '호원동열매유치원',
        value: '3393',
      },
      {
        displayValue: '여의도동여의도유치원',
        value: '3392',
      },
      {
        displayValue: '대화동대화예솔어린이집',
        value: '3391',
      },
      {
        displayValue: '다산동유승아띠어린이집',
        value: '3390',
      },
      {
        displayValue: '다산동햇살마루어린이집',
        value: '3389',
      },
      {
        displayValue: '잠실동즐거운어린이집',
        value: '3388',
      },
      {
        displayValue: '신천동아이소리어린이집',
        value: '3387',
      },
      {
        displayValue: '자양동파랑키즈어학원',
        value: '3386',
      },
      {
        displayValue: '당하동즐거운놀이터어린이집',
        value: '3385',
      },
      {
        displayValue: '백석동햇님유치원',
        value: '3384',
      },
      {
        displayValue: '가양동신세기유치원',
        value: '3383',
      },
      {
        displayValue: '신길동노아어린이집',
        value: '3382',
      },
      {
        displayValue: '미아동키즈래미안어린이집',
        value: '3381',
      },
      {
        displayValue: '덕풍동벽산어린이집',
        value: '3380',
      },
      {
        displayValue: '잠실동양무리어린이집',
        value: '3379',
      },
      {
        displayValue: '학암동가원어린이집',
        value: '3378',
      },
      {
        displayValue: '송내동파인푸르지오어린이집',
        value: '3377',
      },
      {
        displayValue: '신설동아뜰어린이집',
        value: '3376',
      },
      {
        displayValue: '작동효성유치원',
        value: '3375',
      },
      {
        displayValue: '영덕동시립새솔어린이집',
        value: '3374',
      },
      {
        displayValue: '화성시두레어린이집',
        value: '3373',
      },
      {
        displayValue: '포천시세화유치원',
        value: '3372',
      },
      {
        displayValue: '금호동성호어린이집',
        value: '3371',
      },
      {
        displayValue: '용현동도담어린이집',
        value: '3370',
      },
      {
        displayValue: '역촌동무지개동산어린이집',
        value: '3369',
      },
      {
        displayValue: '화성시아기별어린이집',
        value: '3368',
      },
      {
        displayValue: '송죽동나나어린이집',
        value: '3367',
      },
      {
        displayValue: '만수동리라몬테소리어린이집',
        value: '3366',
      },
      {
        displayValue: '상계동대림어린이집',
        value: '3365',
      },
      {
        displayValue: '진관동벼리어린이집',
        value: '3364',
      },
      {
        displayValue: '둔촌동사랑어린이집',
        value: '3363',
      },
      {
        displayValue: '신길동신길어린이집',
        value: '3362',
      },
      {
        displayValue: '산곡동청천예어린이집',
        value: '3361',
      },
      {
        displayValue: '광장동광진유아스포츠단',
        value: '3360',
      },
      {
        displayValue: '방배동프랜시스파커서초어학원',
        value: '3359',
      },
      {
        displayValue: '가락동잠실예닮어린이집',
        value: '3358',
      },
      {
        displayValue: '상동꿈나라어린이집',
        value: '3357',
      },
      {
        displayValue: '상동아람어린이집',
        value: '3356',
      },
      {
        displayValue: '자양동구립자양2동어린이집',
        value: '3355',
      },
      {
        displayValue: '응암동새서울어린이집',
        value: '3354',
      },
      {
        displayValue: '번동청화어린이집',
        value: '3353',
      },
      {
        displayValue: '와동동다온유치원',
        value: '3352',
      },
      {
        displayValue: '반송동솔빛사랑어린이집',
        value: '3351',
      },
      {
        displayValue: '화성시동일미소어린이집',
        value: '3350',
      },
      {
        displayValue: '가락동제일무궁화유치원',
        value: '3349',
      },
      {
        displayValue: '공릉동칼라키즈어학원',
        value: '3348',
      },
      {
        displayValue: '신도림동프레이즈라라어학원',
        value: '3347',
      },
      {
        displayValue: '금광동나린어린이집',
        value: '3346',
      },
      {
        displayValue: '토당동새싹어린이집',
        value: '3345',
      },
      {
        displayValue: '정릉동해뜨는유치원',
        value: '3344',
      },
      {
        displayValue: '청담동청담스위틀',
        value: '3343',
      },
      {
        displayValue: '다산동그린나래어린이집',
        value: '3342',
      },
      {
        displayValue: '주안동용화유치원',
        value: '3341',
      },
      {
        displayValue: '진관동키즈코어학원',
        value: '3340',
      },
      {
        displayValue: '김포시양곡숲유치원',
        value: '3339',
      },
      {
        displayValue: '능동구립능동어린이집',
        value: '3338',
      },
      {
        displayValue: '포일동위브어린이집',
        value: '3337',
      },
      {
        displayValue: '중동SLP어학원',
        value: '3336',
      },
      {
        displayValue: '녹번동도담어린이집',
        value: '3335',
      },
      {
        displayValue: '상봉동진달래유치원',
        value: '3334',
      },
      {
        displayValue: '노량진동벧엘유치원',
        value: '3333',
      },
      {
        displayValue: '사동자이꿈어린이집',
        value: '3332',
      },
      {
        displayValue: '덕풍동보림어린이집',
        value: '3331',
      },
      {
        displayValue: '상동청심어학원',
        value: '3330',
      },
      {
        displayValue: '녹번동선화어린이집',
        value: '3329',
      },
      {
        displayValue: '당동군포유치원',
        value: '3328',
      },
      {
        displayValue: '풍무동풍무숙명유치원',
        value: '3327',
      },
      {
        displayValue: '응암동구립매바위어린이집',
        value: '3326',
      },
      {
        displayValue: '목동한서유치원',
        value: '3325',
      },
      {
        displayValue: '정왕동서해EQ어린이집',
        value: '3324',
      },
      {
        displayValue: '기산동행복어린이집',
        value: '3323',
      },
      {
        displayValue: '망포동망포햇살나무어린이집',
        value: '3322',
      },
      {
        displayValue: '김포시꼬몽어린이집',
        value: '3321',
      },
      {
        displayValue: '장현동리슈빌도레미어린이집',
        value: '3320',
      },
      {
        displayValue: '향동동기쁨어린이집',
        value: '3319',
      },
      {
        displayValue: '죽전동현대예지어린이집',
        value: '3318',
      },
      {
        displayValue: '상현동에코비엘림어린이집',
        value: '3317',
      },
      {
        displayValue: '삼산동사랑해어린이집',
        value: '3316',
      },
      {
        displayValue: '성포동꼬마숲파란나라어린이집',
        value: '3315',
      },
      {
        displayValue: '호원동신일어린이집',
        value: '3314',
      },
      {
        displayValue: '답십리동동아어린이집',
        value: '3313',
      },
      {
        displayValue: '정자동예뜰어린이집',
        value: '3312',
      },
      {
        displayValue: '철산동하담어린이집',
        value: '3311',
      },
      {
        displayValue: '하안동오렌지어린이집',
        value: '3310',
      },
      {
        displayValue: '구로동우성꼬마별어린이집',
        value: '3309',
      },
      {
        displayValue: '신도림동이편한어린이집',
        value: '3308',
      },
      {
        displayValue: '신도림동키즈랜드어학원',
        value: '3307',
      },
      {
        displayValue: '신도림동제일어린이집',
        value: '3306',
      },
      {
        displayValue: '신도림동은솔어린이집',
        value: '3305',
      },
      {
        displayValue: '구로동연두빛어린이집',
        value: '3304',
      },
      {
        displayValue: '구로동새솔어린이집',
        value: '3303',
      },
      {
        displayValue: '구로동이레몬테소리어린이집',
        value: '3302',
      },
      {
        displayValue: '고척동아기둥지어린이집',
        value: '3301',
      },
      {
        displayValue: '고척동해님달님어린이집',
        value: '3300',
      },
      {
        displayValue: '고척동대우맑은샘어린이집',
        value: '3299',
      },
      {
        displayValue: '개봉동광진어린이집',
        value: '3298',
      },
      {
        displayValue: '개봉동호수어린이집',
        value: '3297',
      },
      {
        displayValue: '개봉동사랑몬테소리어린이집',
        value: '3296',
      },
      {
        displayValue: '광명동비타민어린이집',
        value: '3295',
      },
      {
        displayValue: '광명동초콜릿어린이집',
        value: '3294',
      },
      {
        displayValue: '광명동사랑마을어린이집',
        value: '3293',
      },
      {
        displayValue: '철산동동화나라어린이집',
        value: '3292',
      },
      {
        displayValue: '철산동삼흥유치원',
        value: '3291',
      },
      {
        displayValue: '철산동벧엘어린이집',
        value: '3290',
      },
      {
        displayValue: '철산동미래아이어린이집',
        value: '3289',
      },
      {
        displayValue: '철산동철산아기자기어린이집',
        value: '3288',
      },
      {
        displayValue: '하안동가림유치원',
        value: '3287',
      },
      {
        displayValue: '하안동그린들어린이집',
        value: '3286',
      },
      {
        displayValue: '하안동파랑새유치원',
        value: '3285',
      },
      {
        displayValue: '하안동광은유치원',
        value: '3284',
      },
      {
        displayValue: '하안동참사랑어린이집',
        value: '3283',
      },
      {
        displayValue: '신천동세심어린이집',
        value: '3282',
      },
      {
        displayValue: '신천동세심유치원',
        value: '3281',
      },
      {
        displayValue: '신천동푸른하늘어린이집',
        value: '3280',
      },
      {
        displayValue: '신천동하늘어린이집',
        value: '3279',
      },
      {
        displayValue: '신천동예원어린이집',
        value: '3278',
      },
      {
        displayValue: '조남동네이처하임어린이집',
        value: '3277',
      },
      {
        displayValue: '수암동해밀유치원',
        value: '3276',
      },
      {
        displayValue: '본오동우주어린이집',
        value: '3275',
      },
      {
        displayValue: '초지동해맑음어린이집',
        value: '3274',
      },
      {
        displayValue: '고잔동한별유치원',
        value: '3273',
      },
      {
        displayValue: '고잔동보배어린이집',
        value: '3272',
      },
      {
        displayValue: '고잔동아이꿈터어린이집',
        value: '3271',
      },
      {
        displayValue: '월피동동동어린이집',
        value: '3270',
      },
      {
        displayValue: '선부동수정어린이집',
        value: '3269',
      },
      {
        displayValue: '원곡동경남어린이집',
        value: '3268',
      },
      {
        displayValue: '원곡동벽산어린이집',
        value: '3267',
      },
      {
        displayValue: '원곡동아람어린이집',
        value: '3266',
      },
      {
        displayValue: '신길동숲속아침어린이집',
        value: '3265',
      },
      {
        displayValue: '신길동아이리베어린이집',
        value: '3264',
      },
      {
        displayValue: '장곡동바다의별어린이집',
        value: '3263',
      },
      {
        displayValue: '소하동역세권휴먼시아사임당어린이집',
        value: '3262',
      },
      {
        displayValue: '소하동리틀지니어스학원',
        value: '3261',
      },
      {
        displayValue: '일직동포핀스교육주식회사어학원',
        value: '3260',
      },
      {
        displayValue: '소하동트인아이유치원',
        value: '3259',
      },
      {
        displayValue: '소하동다솜어린이집',
        value: '3258',
      },
      {
        displayValue: '소하동영광몬테소리어린이집',
        value: '3257',
      },
      {
        displayValue: '시흥동둘리어린이집',
        value: '3256',
      },
      {
        displayValue: '독산동참사랑유치원',
        value: '3255',
      },
      {
        displayValue: '독산동롯데가온어린이집',
        value: '3254',
      },
      {
        displayValue: '가산동구립별하어린이집',
        value: '3253',
      },
      {
        displayValue: '운양동월드어린이집',
        value: '3252',
      },
      {
        displayValue: '운양동래미안햇님어린이집',
        value: '3251',
      },
      {
        displayValue: '장기동푸리울어린이집',
        value: '3250',
      },
      {
        displayValue: '장기동아이그린어린이집',
        value: '3249',
      },
      {
        displayValue: '운양동파크드림어린이집',
        value: '3248',
      },
      {
        displayValue: '운양동꿈꾸는세상어린이집',
        value: '3247',
      },
      {
        displayValue: '운양동예승어린이집',
        value: '3246',
      },
      {
        displayValue: '운양동네오요게벳어린이집',
        value: '3245',
      },
      {
        displayValue: '운양동꿈꾸는달팽이어린이집',
        value: '3244',
      },
      {
        displayValue: '운양동대림파랑새어린이집',
        value: '3243',
      },
      {
        displayValue: '운양동운양푸른어린이집',
        value: '3242',
      },
      {
        displayValue: '김포시아림어린이집',
        value: '3241',
      },
      {
        displayValue: '장기동엘림빅스맘어린이집',
        value: '3240',
      },
      {
        displayValue: '장기동쑥쑥어린이집',
        value: '3239',
      },
      {
        displayValue: '장기동자연키즈어린이집',
        value: '3238',
      },
      {
        displayValue: '장기동잼잼어린이집',
        value: '3237',
      },
      {
        displayValue: '장기동예가아트어린이집',
        value: '3236',
      },
      {
        displayValue: '장기동라온제나빅스맘어린이집',
        value: '3235',
      },
      {
        displayValue: '장기동노리숲어린이집',
        value: '3234',
      },
      {
        displayValue: '장기동중흥i-class어린이집',
        value: '3233',
      },
      {
        displayValue: '장기동사랑나무어린이집',
        value: '3232',
      },
      {
        displayValue: '장기동자이아이어린이집',
        value: '3231',
      },
      {
        displayValue: '장기동자이사랑어린이집',
        value: '3230',
      },
      {
        displayValue: '장기동센트럴키즈어린이집',
        value: '3229',
      },
      {
        displayValue: '장기동한빛어린이집',
        value: '3228',
      },
      {
        displayValue: '장기동자연꿈어린이집',
        value: '3227',
      },
      {
        displayValue: '장기동우리아이어린이집',
        value: '3226',
      },
      {
        displayValue: '장기동또바기어린이집',
        value: '3225',
      },
      {
        displayValue: '신정동정원유치원',
        value: '3224',
      },
      {
        displayValue: '신정동혜원유아학교',
        value: '3223',
      },
      {
        displayValue: '신정동테리앤제니',
        value: '3222',
      },
      {
        displayValue: '신정동구립연두어린이집',
        value: '3221',
      },
      {
        displayValue: '신월동구립누리봄어린이집',
        value: '3220',
      },
      {
        displayValue: '신월동샘터유치원',
        value: '3219',
      },
      {
        displayValue: '신월동지원어린이집',
        value: '3218',
      },
      {
        displayValue: '신월동푸르미어린이집',
        value: '3217',
      },
      {
        displayValue: '화곡동늘푸른어린이집',
        value: '3216',
      },
      {
        displayValue: '화곡동해아띠스쿨어린이집',
        value: '3215',
      },
      {
        displayValue: '화곡동늘품어린이집',
        value: '3214',
      },
      {
        displayValue: '목동KTI행복한어린이집',
        value: '3213',
      },
      {
        displayValue: '목동빛나유치원',
        value: '3212',
      },
      {
        displayValue: '목동꽃사슴어린이집',
        value: '3211',
      },
      {
        displayValue: '목동엄마사랑어린이집',
        value: '3210',
      },
      {
        displayValue: '목동아음어린이집',
        value: '3209',
      },
      {
        displayValue: '염창동리틀빌리지어린이집',
        value: '3208',
      },
      {
        displayValue: '염창동아이편한어린이집',
        value: '3207',
      },
      {
        displayValue: '염창동푸르미어린이집',
        value: '3206',
      },
      {
        displayValue: '가양동해리유치원',
        value: '3205',
      },
      {
        displayValue: '등촌동리틀팍스어학원',
        value: '3204',
      },
      {
        displayValue: '화곡동구립힐스토리어린이집',
        value: '3203',
      },
      {
        displayValue: '화곡동혜시의사과나무어린이집',
        value: '3202',
      },
      {
        displayValue: '화곡동꼬마숲어린이집',
        value: '3201',
      },
      {
        displayValue: '내발산동구립꿈비어린이집',
        value: '3200',
      },
      {
        displayValue: '방화동한나유치원',
        value: '3199',
      },
      {
        displayValue: '소사본동하늘유치원',
        value: '3198',
      },
      {
        displayValue: '괴안동영원어린이집',
        value: '3197',
      },
      {
        displayValue: '항동자람어린이집',
        value: '3196',
      },
      {
        displayValue: '오류동푸른동산유치원',
        value: '3195',
      },
      {
        displayValue: '오류동구로한빛어린이집',
        value: '3194',
      },
      {
        displayValue: '오류동아이천국어린이집',
        value: '3193',
      },
      {
        displayValue: '수궁동에벤에셀어린이집',
        value: '3192',
      },
      {
        displayValue: '궁동은별어린이집',
        value: '3191',
      },
      {
        displayValue: '오류동동정성모유치원',
        value: '3190',
      },
      {
        displayValue: '소사동밀알어린이집',
        value: '3189',
      },
      {
        displayValue: '심곡동예은아기사랑어린이집',
        value: '3188',
      },
      {
        displayValue: '원미동룸비니유치원',
        value: '3187',
      },
      {
        displayValue: '약대동랄랄라꼬마숲어린이집',
        value: '3186',
      },
      {
        displayValue: '중동라이즈어학원부천캠퍼스',
        value: '3185',
      },
      {
        displayValue: '중동숲보아어린이집',
        value: '3184',
      },
      {
        displayValue: '중동청담아이가르텐',
        value: '3183',
      },
      {
        displayValue: '중동백합어린이집',
        value: '3182',
      },
      {
        displayValue: '상동아리솔유치원',
        value: '3181',
      },
      {
        displayValue: '상동자연몬테소리어린이집',
        value: '3180',
      },
      {
        displayValue: '상동푸른어린이집',
        value: '3179',
      },
      {
        displayValue: '상동피터팬어린이집',
        value: '3178',
      },
      {
        displayValue: '풍무동그루터기어린이집',
        value: '3177',
      },
      {
        displayValue: '오류동꼬마정원유치원',
        value: '3176',
      },
      {
        displayValue: '마전동검단어린이집',
        value: '3175',
      },
      {
        displayValue: '마전동단비어린이집',
        value: '3174',
      },
      {
        displayValue: '당하동해솔어린이집',
        value: '3173',
      },
      {
        displayValue: '원당동예빈어린이집',
        value: '3172',
      },
      {
        displayValue: '불로동꿈꾸는i어린이집',
        value: '3171',
      },
      {
        displayValue: '감정동참신안어린이집',
        value: '3170',
      },
      {
        displayValue: '감정동큰나무어린이집',
        value: '3169',
      },
      {
        displayValue: '걸포동키즈꿈터어린이집',
        value: '3168',
      },
      {
        displayValue: '걸포동코코어린이집',
        value: '3167',
      },
      {
        displayValue: '걸포동희소유치원',
        value: '3166',
      },
      {
        displayValue: '풍무동바다어린이집',
        value: '3165',
      },
      {
        displayValue: '풍무동동화나라어린이집',
        value: '3164',
      },
      {
        displayValue: '풍무동푸르지오무지개어린이집',
        value: '3163',
      },
      {
        displayValue: '풍무동초롱초롱어린이집',
        value: '3162',
      },
      {
        displayValue: '풍무동금별어린이집',
        value: '3161',
      },
      {
        displayValue: '풍무동꿈애뜰어린이집',
        value: '3160',
      },
      {
        displayValue: '풍무동꿈동이어린이집',
        value: '3159',
      },
      {
        displayValue: '풍무동햇빛자연어린이집',
        value: '3158',
      },
      {
        displayValue: '풍무동예쁜어린이집',
        value: '3157',
      },
      {
        displayValue: '풍무동사랑해어린이집',
        value: '3156',
      },
      {
        displayValue: '풍무동초록빛어린이집',
        value: '3155',
      },
      {
        displayValue: '김포시로뎀나무어린이집',
        value: '3154',
      },
      {
        displayValue: '김포시아이리더어린이집',
        value: '3153',
      },
      {
        displayValue: '화서동꿈땅어린이집',
        value: '3152',
      },
      {
        displayValue: '화서동수정아이어린이집',
        value: '3151',
      },
      {
        displayValue: '화서동숲속어린이집',
        value: '3150',
      },
      {
        displayValue: '화서동블루밍사임당어린이집',
        value: '3149',
      },
      {
        displayValue: '화서동키즈다솜어린이집',
        value: '3148',
      },
      {
        displayValue: '화서동화서사임당어린이집',
        value: '3147',
      },
      {
        displayValue: '화서동해바라기어린이집',
        value: '3146',
      },
      {
        displayValue: '천천동성민유치원',
        value: '3145',
      },
      {
        displayValue: '천천동한그루어린이집',
        value: '3144',
      },
      {
        displayValue: '정자동두견어린이집',
        value: '3143',
      },
      {
        displayValue: '정자동아이꿈어린이집',
        value: '3142',
      },
      {
        displayValue: '영화동아이들꿈터어린이집',
        value: '3141',
      },
      {
        displayValue: '연무동리라어린이집',
        value: '3140',
      },
      {
        displayValue: '이의동자연키즈어린이집',
        value: '3139',
      },
      {
        displayValue: '이의동아이뜰어린이집',
        value: '3138',
      },
      {
        displayValue: '이의동바다어린이집',
        value: '3137',
      },
      {
        displayValue: '이의동광교하늘어린이집',
        value: '3136',
      },
      {
        displayValue: '이의동오드키즈어린이집',
        value: '3135',
      },
      {
        displayValue: '하동광교느티나무어린이집',
        value: '3134',
      },
      {
        displayValue: '인계동성빈센트병원어린이집',
        value: '3133',
      },
      {
        displayValue: '영통동하늘몬테소리어린이집',
        value: '3132',
      },
      {
        displayValue: '영통동지구촌어린이집',
        value: '3131',
      },
      {
        displayValue: '매탄동애플키즈어린이집',
        value: '3130',
      },
      {
        displayValue: '매탄동하랑키즈어린이집',
        value: '3129',
      },
      {
        displayValue: '인계동토마토어린이집',
        value: '3128',
      },
      {
        displayValue: '인계동세아어린이집',
        value: '3127',
      },
      {
        displayValue: '인계동동화나라어린이집',
        value: '3126',
      },
      {
        displayValue: '인계동꿈자람어린이집',
        value: '3125',
      },
      {
        displayValue: '우만동움트리어린이집',
        value: '3124',
      },
      {
        displayValue: '호매실동해닮수자인어린이집',
        value: '3123',
      },
      {
        displayValue: '금곡동예인어린이집',
        value: '3122',
      },
      {
        displayValue: '금곡동호반라온어린이집',
        value: '3121',
      },
      {
        displayValue: '금곡동동성어린이집',
        value: '3120',
      },
      {
        displayValue: '구운동지혜샘어린이집',
        value: '3119',
      },
      {
        displayValue: '화서동아띠어린이집',
        value: '3118',
      },
      {
        displayValue: '화서동신동아어린이집',
        value: '3117',
      },
      {
        displayValue: '화서동행복한아이어린이집',
        value: '3116',
      },
      {
        displayValue: '화서동동그라미어린이집',
        value: '3115',
      },
      {
        displayValue: '율전동아이샘어린이집',
        value: '3114',
      },
      {
        displayValue: '율전동우루루어린이집',
        value: '3113',
      },
      {
        displayValue: '당수동삼정힐탑어린이집',
        value: '3112',
      },
      {
        displayValue: '동천동베스아이유치원',
        value: '3111',
      },
      {
        displayValue: '풍덕천동다움어린이집',
        value: '3110',
      },
      {
        displayValue: '하동광교샛별어린이집',
        value: '3109',
      },
      {
        displayValue: '상현동대림키즈랜드어린이집',
        value: '3108',
      },
      {
        displayValue: '상현동예강어린이집',
        value: '3107',
      },
      {
        displayValue: '상현동드림킹덤어린이집',
        value: '3106',
      },
      {
        displayValue: '상현동롯데어린이집',
        value: '3105',
      },
      {
        displayValue: '상현동위즈아이어린이집',
        value: '3104',
      },
      {
        displayValue: '상현동금호키즈스쿨어린이집',
        value: '3103',
      },
      {
        displayValue: '상현동수지은초롱어린이집',
        value: '3102',
      },
      {
        displayValue: '풍덕천동꼬마또래어린이집',
        value: '3101',
      },
      {
        displayValue: '풍덕천동성민어린이집',
        value: '3100',
      },
      {
        displayValue: '풍덕천동성민프리미어스쿨',
        value: '3099',
      },
      {
        displayValue: '상현동정다운어린이집',
        value: '3098',
      },
      {
        displayValue: '신봉동아름드리어린이집',
        value: '3097',
      },
      {
        displayValue: '신봉동광교산자이솔숲어린이집',
        value: '3096',
      },
      {
        displayValue: '풍덕천동블링블링어린이집',
        value: '3095',
      },
      {
        displayValue: '풍덕천동수지성민유치원',
        value: '3094',
      },
      {
        displayValue: '풍덕천동삼성별어린이집',
        value: '3093',
      },
      {
        displayValue: '구갈동구갈성민유치원',
        value: '3092',
      },
      {
        displayValue: '신갈동예람키즈어린이집',
        value: '3091',
      },
      {
        displayValue: '신갈동도현나래어린이집',
        value: '3090',
      },
      {
        displayValue: '동천동밤비니키즈스쿨어린이집',
        value: '3089',
      },
      {
        displayValue: '죽전동해솔어린이집',
        value: '3088',
      },
      {
        displayValue: '죽전동벽산타운어린이집',
        value: '3087',
      },
      {
        displayValue: '죽전동세은숲어린이집',
        value: '3086',
      },
      {
        displayValue: '죽전동시드어린이집',
        value: '3085',
      },
      {
        displayValue: '죽전동가온어린이집',
        value: '3084',
      },
      {
        displayValue: '죽전동수지다솜어린이집',
        value: '3083',
      },
      {
        displayValue: '죽전동sunnyfunny어린이집',
        value: '3082',
      },
      {
        displayValue: '죽전동사임당어린이집죽전2점',
        value: '3081',
      },
      {
        displayValue: '죽전동현대베베스쿨어린이집',
        value: '3080',
      },
      {
        displayValue: '죽전동죽전하나어린이집',
        value: '3079',
      },
      {
        displayValue: '용인시명문자연어린이집',
        value: '3078',
      },
      {
        displayValue: '죽전동꽃메어린이집',
        value: '3077',
      },
      {
        displayValue: '마북동마북e편한세상어린이집',
        value: '3076',
      },
      {
        displayValue: '마북동햇살가득한어린이집',
        value: '3075',
      },
      {
        displayValue: '마북동그린별어린이집',
        value: '3074',
      },
      {
        displayValue: '청덕동키즈스토리어린이집',
        value: '3073',
      },
      {
        displayValue: '상하동향상어린이집',
        value: '3072',
      },
      {
        displayValue: '청덕동청덕꼬마천사어린이집',
        value: '3071',
      },
      {
        displayValue: '화성시창의나무아트어린이집',
        value: '3070',
      },
      {
        displayValue: '화성시동남영아어린이집',
        value: '3069',
      },
      {
        displayValue: '화성시풍림어린이집',
        value: '3068',
      },
      {
        displayValue: '화성시화성파크드림어린이집',
        value: '3067',
      },
      {
        displayValue: '화성시상록사랑숲어린이집',
        value: '3066',
      },
      {
        displayValue: '화성시해봄어린이집',
        value: '3065',
      },
      {
        displayValue: '화성시베베숲어린이집',
        value: '3064',
      },
      {
        displayValue: '화성시미소지움아이사랑어린이집',
        value: '3063',
      },
      {
        displayValue: '화성시우림필유어린이집',
        value: '3062',
      },
      {
        displayValue: '화성시사랑톡톡어린이집',
        value: '3061',
      },
      {
        displayValue: '화성시향남꼬마숲어린이집',
        value: '3060',
      },
      {
        displayValue: '화성시사랑모아어린이집',
        value: '3059',
      },
      {
        displayValue: '화성시예향어린이집',
        value: '3058',
      },
      {
        displayValue: '화성시우리어린이집',
        value: '3057',
      },
      {
        displayValue: '화성시신흥동어린이집',
        value: '3056',
      },
      {
        displayValue: '화성시한라키즈어린이집',
        value: '3055',
      },
      {
        displayValue: '용인시화산성민유치원',
        value: '3054',
      },
      {
        displayValue: '용인시초록나무어린이집',
        value: '3053',
      },
      {
        displayValue: '용인시트리플어린이집',
        value: '3052',
      },
      {
        displayValue: '용인시푸른산i어린이집',
        value: '3051',
      },
      {
        displayValue: '용인시호크마어린이집',
        value: '3050',
      },
      {
        displayValue: '고림동양우행복한어린이집',
        value: '3049',
      },
      {
        displayValue: '마평동리틀그린어린이집',
        value: '3048',
      },
      {
        displayValue: '김량장동금호어울림어린이집',
        value: '3047',
      },
      {
        displayValue: '김량장동삼환화이트어린이집',
        value: '3046',
      },
      {
        displayValue: '중동솔로몬영재어린이집',
        value: '3045',
      },
      {
        displayValue: '동백동서해숲속어린이집',
        value: '3044',
      },
      {
        displayValue: '상갈동노벨생태어린이집',
        value: '3043',
      },
      {
        displayValue: '병점동한일황토어린이집',
        value: '3042',
      },
      {
        displayValue: '송산동해피성심어린이집',
        value: '3041',
      },
      {
        displayValue: '안녕동현대하람어린이집',
        value: '3040',
      },
      {
        displayValue: '기안동푸른밭어린이집',
        value: '3039',
      },
      {
        displayValue: '화성시크레파스어린이집',
        value: '3038',
      },
      {
        displayValue: '새솔동금강사랑숲어린이집',
        value: '3037',
      },
      {
        displayValue: '새솔동아이동산어린이집',
        value: '3036',
      },
      {
        displayValue: '새솔동대방다둥어린이집',
        value: '3035',
      },
      {
        displayValue: '새솔동새솔별어린이집',
        value: '3034',
      },
      {
        displayValue: '새솔동대방아이나라어린이집',
        value: '3033',
      },
      {
        displayValue: '새솔동송산수노을어린이집',
        value: '3032',
      },
      {
        displayValue: '새솔동청아어린이집',
        value: '3031',
      },
      {
        displayValue: '새솔동금빛어린이집',
        value: '3030',
      },
      {
        displayValue: '화성시샛별어린이집',
        value: '3029',
      },
      {
        displayValue: '화성시은혜의동산교회부설어린이집',
        value: '3028',
      },
      {
        displayValue: '화성시천천어린이집',
        value: '3027',
      },
      {
        displayValue: '보라동보라햇빛어린이집',
        value: '3026',
      },
      {
        displayValue: '상하동더키즈i어린이집',
        value: '3025',
      },
      {
        displayValue: '장지동사랑누리어린이집',
        value: '3024',
      },
      {
        displayValue: '장지동햇살나무어린이집',
        value: '3023',
      },
      {
        displayValue: '산척동숲의요정수피아어린이집',
        value: '3022',
      },
      {
        displayValue: '산척동부영사랑으로어린이집',
        value: '3021',
      },
      {
        displayValue: '목동감람나무어린이집',
        value: '3020',
      },
      {
        displayValue: '목동키즈라라어린이집',
        value: '3019',
      },
      {
        displayValue: '목동호반아이뜰어린이집',
        value: '3018',
      },
      {
        displayValue: '산척동아이원유치원',
        value: '3017',
      },
      {
        displayValue: '청계동호반아이미소어린이집',
        value: '3016',
      },
      {
        displayValue: '청계동행복숲어린이집',
        value: '3015',
      },
      {
        displayValue: '청계동꿈동이어린이집',
        value: '3014',
      },
      {
        displayValue: '영천동경남키즈솔어린이집',
        value: '3013',
      },
      {
        displayValue: '영천동행복마을햇살어린이집',
        value: '3012',
      },
      {
        displayValue: '기산동파크빅스맘어린이집',
        value: '3011',
      },
      {
        displayValue: '영천동윤정유치원',
        value: '3010',
      },
      {
        displayValue: '반송동나루어린이집',
        value: '3009',
      },
      {
        displayValue: '반송동반디어린이집',
        value: '3008',
      },
      {
        displayValue: '반송동FTKEnglish화성동탄어학원',
        value: '3007',
      },
      {
        displayValue: '반송동행복한리더로어린이집',
        value: '3006',
      },
      {
        displayValue: '반송동꿈에그린어린이집',
        value: '3005',
      },
      {
        displayValue: '반송동한빛새싹어린이집',
        value: '3004',
      },
      {
        displayValue: '석우동하늘숲어린이집',
        value: '3003',
      },
      {
        displayValue: '석우동하늘사랑어린이집',
        value: '3002',
      },
      {
        displayValue: '반송동굿맘아이솔어린이집',
        value: '3001',
      },
      {
        displayValue: '반송동프라임유치원',
        value: '3000',
      },
      {
        displayValue: '능동푸른향기어린이집',
        value: '2999',
      },
      {
        displayValue: '능동자이숲어린이집',
        value: '2998',
      },
      {
        displayValue: '병점동아이린어린이집',
        value: '2997',
      },
      {
        displayValue: '진안동본어린이집',
        value: '2996',
      },
      {
        displayValue: '능동나인유치원',
        value: '2995',
      },
      {
        displayValue: '능동반딧불이어린이집',
        value: '2994',
      },
      {
        displayValue: '능동베이브하우스어린이집',
        value: '2993',
      },
      {
        displayValue: '기산동피터팬어린이집',
        value: '2992',
      },
      {
        displayValue: '반월동우리해사랑어린이집',
        value: '2991',
      },
      {
        displayValue: '반월동대림꿈나무어린이집',
        value: '2990',
      },
      {
        displayValue: '반월동이편한어린이집',
        value: '2989',
      },
      {
        displayValue: '반월동키즈파크어린이집',
        value: '2988',
      },
      {
        displayValue: '서천동SK보물섬어린이집',
        value: '2987',
      },
      {
        displayValue: '다산동품속어린이집',
        value: '2986',
      },
      {
        displayValue: '다산동부영아이뜰어린이집',
        value: '2985',
      },
      {
        displayValue: '갈매동하솜어린이집',
        value: '2984',
      },
      {
        displayValue: '갈매동갈매아이어린이집',
        value: '2983',
      },
      {
        displayValue: '갈매동예닮어린이집',
        value: '2982',
      },
      {
        displayValue: '갈매동리틀시티어린이집',
        value: '2981',
      },
      {
        displayValue: '갈매동아이조아어린이집',
        value: '2980',
      },
      {
        displayValue: '갈매동초록빛어린이집',
        value: '2979',
      },
      {
        displayValue: '갈매동해나라어린이집',
        value: '2978',
      },
      {
        displayValue: '갈매동더샵리틀어린이집',
        value: '2977',
      },
      {
        displayValue: '인창동하랑어린이집',
        value: '2976',
      },
      {
        displayValue: '인창동이삭어린이집',
        value: '2975',
      },
      {
        displayValue: '인창동애림어린이집',
        value: '2974',
      },
      {
        displayValue: '인창동동화나라어린이집',
        value: '2973',
      },
      {
        displayValue: '인창동와이즈키즈어린이집',
        value: '2972',
      },
      {
        displayValue: '인창동예림어린이집',
        value: '2971',
      },
      {
        displayValue: '인창동예랑어린이집',
        value: '2970',
      },
      {
        displayValue: '인창동토리랑어린이집',
        value: '2969',
      },
      {
        displayValue: '다산동부영라온어린이집',
        value: '2968',
      },
      {
        displayValue: '다산동가온누리어린이집',
        value: '2967',
      },
      {
        displayValue: '다산동부영아이꿈터어린이집',
        value: '2966',
      },
      {
        displayValue: '다산동튼튼이어린이집',
        value: '2965',
      },
      {
        displayValue: '다산동금강자연뜰어린이집',
        value: '2964',
      },
      {
        displayValue: '다산동가운사랑해어린이집',
        value: '2963',
      },
      {
        displayValue: '수택동시립구리수자인어린이집',
        value: '2962',
      },
      {
        displayValue: '수택동동심어린이집',
        value: '2961',
      },
      {
        displayValue: '수택동아이랑어린이집',
        value: '2960',
      },
      {
        displayValue: '교문동피터팬어린이집',
        value: '2959',
      },
      {
        displayValue: '교문동덕현어린이집',
        value: '2958',
      },
      {
        displayValue: '교문동예그리나어린이집',
        value: '2957',
      },
      {
        displayValue: '가락동쌍용어린이집',
        value: '2956',
      },
      {
        displayValue: '역삼동강남사임당어린이집',
        value: '2955',
      },
      {
        displayValue: '잠실동라임나무어린이집',
        value: '2954',
      },
      {
        displayValue: '송파동래미안파인탑어린이집',
        value: '2953',
      },
      {
        displayValue: '잠실동엘스사임당어린이집',
        value: '2952',
      },
      {
        displayValue: '잠실동아이린어린이집',
        value: '2951',
      },
      {
        displayValue: '잠실동해맑음몬테소리어린이집',
        value: '2950',
      },
      {
        displayValue: '방이동무궁화누리어린이집',
        value: '2949',
      },
      {
        displayValue: '방이동요요몬테소리어린이집',
        value: '2948',
      },
      {
        displayValue: '방이동아토리송파지사',
        value: '2947',
      },
      {
        displayValue: '방이동두꼬마어린이집',
        value: '2946',
      },
      {
        displayValue: '오금동그림아이놀이어학원',
        value: '2945',
      },
      {
        displayValue: '가락동다래어린이집',
        value: '2944',
      },
      {
        displayValue: '송파동브니엘어린이집',
        value: '2943',
      },
      {
        displayValue: '가락동동부영재어린이집',
        value: '2942',
      },
      {
        displayValue: '송파동영재교육어린이집',
        value: '2941',
      },
      {
        displayValue: '송파동초롱별어린이집',
        value: '2940',
      },
      {
        displayValue: '석촌동코스모스어린이집',
        value: '2939',
      },
      {
        displayValue: '수서동해피어린이집',
        value: '2938',
      },
      {
        displayValue: '역삼동킹스키즈어린이집',
        value: '2937',
      },
      {
        displayValue: '삼성동초망몬테소리어린이집',
        value: '2936',
      },
      {
        displayValue: '삼성동아이큰숲어린이집',
        value: '2935',
      },
      {
        displayValue: '장지동위례수어린이집',
        value: '2934',
      },
      {
        displayValue: '금광동아이별어린이집',
        value: '2933',
      },
      {
        displayValue: '창곡동오로라어린이집',
        value: '2932',
      },
      {
        displayValue: '감일동영이어린이집',
        value: '2931',
      },
      {
        displayValue: '감이동감일더샵어린이집',
        value: '2930',
      },
      {
        displayValue: '감일동아기별어린이집',
        value: '2929',
      },
      {
        displayValue: '학암동이영어린이집',
        value: '2928',
      },
      {
        displayValue: '마천동파크빅스맘어린이집',
        value: '2927',
      },
      {
        displayValue: '태평동아가나무어린이집',
        value: '2926',
      },
      {
        displayValue: '상대원동지혜숲어린이집',
        value: '2925',
      },
      {
        displayValue: '은행동아이사랑어린이집',
        value: '2924',
      },
      {
        displayValue: '은행동그림여행예능어린이집',
        value: '2923',
      },
      {
        displayValue: '금광동기쁜우리-i어린이집',
        value: '2922',
      },
      {
        displayValue: '창곡동고운아이어린이집',
        value: '2921',
      },
      {
        displayValue: '창곡동사랑별어린이집',
        value: '2920',
      },
      {
        displayValue: '야탑동브로베르어린이집',
        value: '2919',
      },
      {
        displayValue: '여수동산들어린이집',
        value: '2918',
      },
      {
        displayValue: '창곡동아이숲어린이집',
        value: '2917',
      },
      {
        displayValue: '신흥동파스텔어린이집',
        value: '2916',
      },
      {
        displayValue: '복정동제이수진어린이집',
        value: '2915',
      },
      {
        displayValue: '태평동오렌지리틀스쿨어린이집',
        value: '2914',
      },
      {
        displayValue: '삼평동하늘어린이집',
        value: '2913',
      },
      {
        displayValue: '상계동꼬망세어린이집',
        value: '2912',
      },
      {
        displayValue: '상계동키즈브라운어린이집',
        value: '2911',
      },
      {
        displayValue: '공릉동삼육유치원',
        value: '2910',
      },
      {
        displayValue: '공릉동희망나래어린이집',
        value: '2909',
      },
      {
        displayValue: '공릉동풍림꿈모리어린이집',
        value: '2908',
      },
      {
        displayValue: '공릉동아랑유치원',
        value: '2907',
      },
      {
        displayValue: '공릉동엘림어린이집',
        value: '2906',
      },
      {
        displayValue: '월계동월계숲속어린이집',
        value: '2905',
      },
      {
        displayValue: '묵동라임어린이집',
        value: '2904',
      },
      {
        displayValue: '중화동새봄어린이집',
        value: '2903',
      },
      {
        displayValue: '면목동별하어린이집',
        value: '2902',
      },
      {
        displayValue: '전농동키즈윌어린이집',
        value: '2901',
      },
      {
        displayValue: '답십리동꼬마숲아띠어린이집',
        value: '2900',
      },
      {
        displayValue: '답십리동예은어린이집',
        value: '2899',
      },
      {
        displayValue: '전농동햇님어린이집',
        value: '2898',
      },
      {
        displayValue: '전농동중앙어린이집',
        value: '2897',
      },
      {
        displayValue: '답십리동우성그린어린이집',
        value: '2896',
      },
      {
        displayValue: '답십리동자연어린이집',
        value: '2895',
      },
      {
        displayValue: '남양주시꿈이쑥쑥어린이집',
        value: '2894',
      },
      {
        displayValue: '남양주시유호꼬마별어린이집',
        value: '2893',
      },
      {
        displayValue: '별내동동익별빛어린이집',
        value: '2892',
      },
      {
        displayValue: '별내동새싹나라어린이집',
        value: '2891',
      },
      {
        displayValue: '별내동큰별아이파크어린이집',
        value: '2890',
      },
      {
        displayValue: '별내동별내아이어린이집',
        value: '2889',
      },
      {
        displayValue: '별내동별내사임당어린이집',
        value: '2888',
      },
      {
        displayValue: '남양주시빛예꼬어린이집',
        value: '2887',
      },
      {
        displayValue: '남양주시새싹어린이집',
        value: '2886',
      },
      {
        displayValue: '남양주시아이파크사과나무어린이집',
        value: '2885',
      },
      {
        displayValue: '평내동하기오스어학원',
        value: '2884',
      },
      {
        displayValue: '평내동키즈솔어린이집',
        value: '2883',
      },
      {
        displayValue: '호평동우미사랑어린이집',
        value: '2882',
      },
      {
        displayValue: '호평동초아어린이집',
        value: '2881',
      },
      {
        displayValue: '호평동중흥클래스어린이집',
        value: '2880',
      },
      {
        displayValue: '남양주시늘푸른동산어린이집',
        value: '2879',
      },
      {
        displayValue: '남양주시도뮤토해누리어린이집',
        value: '2878',
      },
      {
        displayValue: '고덕동아이캐슬어린이집',
        value: '2877',
      },
      {
        displayValue: '암사동좋은친구어린이집',
        value: '2876',
      },
      {
        displayValue: '암사동쥬베베어린이집',
        value: '2875',
      },
      {
        displayValue: '암사동사랑샘어린이집',
        value: '2874',
      },
      {
        displayValue: '암사동꼬꼬마어린이집',
        value: '2873',
      },
      {
        displayValue: '암사동또래또래어린이집',
        value: '2872',
      },
      {
        displayValue: '암사동새순어린이집',
        value: '2871',
      },
      {
        displayValue: '암사동아이숲어린이집',
        value: '2870',
      },
      {
        displayValue: '암사동바움어린이집',
        value: '2869',
      },
      {
        displayValue: '망월동해다미어린이집',
        value: '2868',
      },
      {
        displayValue: '망월동사랑어린이집',
        value: '2867',
      },
      {
        displayValue: '풍산동더샵키움어린이집',
        value: '2866',
      },
      {
        displayValue: '상일동강동다원어린이집',
        value: '2865',
      },
      {
        displayValue: '상일동꼬마별어린이집',
        value: '2864',
      },
      {
        displayValue: '명일동혜윰어린이집',
        value: '2863',
      },
      {
        displayValue: '명일동조은어린이집',
        value: '2862',
      },
      {
        displayValue: '명일동이슬어린이집',
        value: '2861',
      },
      {
        displayValue: '길동아기랑놀이랑어린이집',
        value: '2860',
      },
      {
        displayValue: '길동성심어린이집',
        value: '2859',
      },
      {
        displayValue: '성내동이삭어린이집',
        value: '2858',
      },
      {
        displayValue: '천호동아기둥지어린이집',
        value: '2857',
      },
      {
        displayValue: '길동우성어린이집',
        value: '2856',
      },
      {
        displayValue: '길동자이맘어린이집',
        value: '2855',
      },
      {
        displayValue: '둔촌동예맘어린이집',
        value: '2854',
      },
      {
        displayValue: '성내동별초롱어린이집',
        value: '2853',
      },
      {
        displayValue: '신당동리틀포도나무어린이집',
        value: '2852',
      },
      {
        displayValue: '신당동수암유치원',
        value: '2851',
      },
      {
        displayValue: '답십리동조은어린이집',
        value: '2850',
      },
      {
        displayValue: '답십리동지니맘어린이집',
        value: '2849',
      },
      {
        displayValue: '송정동행복가득어린이집',
        value: '2848',
      },
      {
        displayValue: '구의동슬기유치원',
        value: '2847',
      },
      {
        displayValue: '구의동라이즈어학원',
        value: '2846',
      },
      {
        displayValue: '광장동노엠워커힐어학원',
        value: '2845',
      },
      {
        displayValue: '광장동보성유치원',
        value: '2844',
      },
      {
        displayValue: '광장동청구이화유치원어학원',
        value: '2843',
      },
      {
        displayValue: '광장동더블유(W)칼리지어학원',
        value: '2842',
      },
      {
        displayValue: '구의동베베궁광진학원',
        value: '2841',
      },
      {
        displayValue: '자양동성산유치원',
        value: '2840',
      },
      {
        displayValue: '자양동키즈팜어린이집',
        value: '2839',
      },
      {
        displayValue: '자양동으뜸어린이집',
        value: '2838',
      },
      {
        displayValue: '자양동자양어린이집',
        value: '2837',
      },
      {
        displayValue: '자양동효지어린이집',
        value: '2836',
      },
      {
        displayValue: '자양동아이비키즈어린이집',
        value: '2835',
      },
      {
        displayValue: '성수동즐거운어린이집',
        value: '2834',
      },
      {
        displayValue: '성수동로사유치원',
        value: '2833',
      },
      {
        displayValue: '하왕십리동왕십리하나어린이집',
        value: '2832',
      },
      {
        displayValue: '행당동율화유치원',
        value: '2831',
      },
      {
        displayValue: '응봉동세성유치원',
        value: '2830',
      },
      {
        displayValue: '금호동성동어린이집',
        value: '2829',
      },
      {
        displayValue: '금호동아이들세상유치원',
        value: '2828',
      },
      {
        displayValue: '옥수동구립극동어린이집',
        value: '2827',
      },
      {
        displayValue: '옥수동옥수예일유치원',
        value: '2826',
      },
      {
        displayValue: '금호동하니삐아제어린이집',
        value: '2825',
      },
      {
        displayValue: '옥수동라이즈어학원',
        value: '2824',
      },
      {
        displayValue: '천현동아이세상어린이집',
        value: '2823',
      },
      {
        displayValue: '신장동하남시민s몬테소리어린이집',
        value: '2822',
      },
      {
        displayValue: '신장동미소어린이집',
        value: '2821',
      },
      {
        displayValue: '신장동초록아이들어린이집',
        value: '2820',
      },
      {
        displayValue: '덕풍동그린베베스쿨어린이집',
        value: '2819',
      },
      {
        displayValue: '덕풍동진모루어린이집',
        value: '2818',
      },
      {
        displayValue: '망월동시온어린이집',
        value: '2817',
      },
      {
        displayValue: '망월동꼬꼬마어린이집',
        value: '2816',
      },
      {
        displayValue: '풍산동예쁜아이어린이집',
        value: '2815',
      },
      {
        displayValue: '망월동루나리움어린이집',
        value: '2814',
      },
      {
        displayValue: '망월동라온어린이집',
        value: '2813',
      },
      {
        displayValue: '망월동꿈빛나무어린이집',
        value: '2812',
      },
      {
        displayValue: '강일동리틀프린스어린이집',
        value: '2811',
      },
      {
        displayValue: '강일동은행나무어린이집',
        value: '2810',
      },
      {
        displayValue: '선동자이키즈어린이집',
        value: '2809',
      },
      {
        displayValue: '망월동꿀단지어린이집',
        value: '2808',
      },
      {
        displayValue: '망월동미사별어린이집',
        value: '2807',
      },
      {
        displayValue: '망월동바움어린이집',
        value: '2806',
      },
      {
        displayValue: '망월동서희키즈어린이집',
        value: '2805',
      },
      {
        displayValue: '선동아이숲어린이집',
        value: '2804',
      },
      {
        displayValue: '남양주시아이들향기어린이집',
        value: '2803',
      },
      {
        displayValue: '남양주시와부에벤에셀어린이집',
        value: '2802',
      },
      {
        displayValue: '남양주시아이들숲향기어린이집',
        value: '2801',
      },
      {
        displayValue: '남양주시코오롱어린이집',
        value: '2800',
      },
      {
        displayValue: '남양주시친구네어린이집',
        value: '2799',
      },
      {
        displayValue: '남양주시아이들세상어린이집',
        value: '2798',
      },
      {
        displayValue: '남양주시주공키즈톡톡어린이집',
        value: '2797',
      },
      {
        displayValue: '남양주시예꼬어린이집',
        value: '2796',
      },
      {
        displayValue: '남양주시아이미소어린이집',
        value: '2795',
      },
      {
        displayValue: '남양주시도곡사랑어린이집',
        value: '2794',
      },
      {
        displayValue: '남양주시로얄키즈어린이집',
        value: '2793',
      },
      {
        displayValue: '판교동푸르지오어린이집',
        value: '2792',
      },
      {
        displayValue: '판교동상록i어린이집',
        value: '2791',
      },
      {
        displayValue: '구미동키즈펀어린이집',
        value: '2790',
      },
      {
        displayValue: '구미동예지어린이집',
        value: '2789',
      },
      {
        displayValue: '판교동달과별어린이집',
        value: '2788',
      },
      {
        displayValue: '서현동예쁜또래또어린이집',
        value: '2787',
      },
      {
        displayValue: '정자동베이비0123어린이집',
        value: '2786',
      },
      {
        displayValue: '서현동소망어린이집',
        value: '2785',
      },
      {
        displayValue: '서현동초롱어린이집',
        value: '2784',
      },
      {
        displayValue: '판교동한림풀에버어린이집',
        value: '2783',
      },
      {
        displayValue: '서현동리틀예꼬어린이집',
        value: '2782',
      },
      {
        displayValue: '구미동예손어린이집',
        value: '2781',
      },
      {
        displayValue: '운중동판교꿈초롱어린이집',
        value: '2780',
      },
      {
        displayValue: '정자동꿈터어린이집',
        value: '2779',
      },
      {
        displayValue: '정자동아이샘어린이집',
        value: '2778',
      },
      {
        displayValue: '분당동이레어린이집',
        value: '2777',
      },
      {
        displayValue: '분당동도담어린이집',
        value: '2776',
      },
      {
        displayValue: '분당동키움어린이집',
        value: '2775',
      },
      {
        displayValue: '금곡동에듀키즈어린이집',
        value: '2774',
      },
      {
        displayValue: '수내동사랑샘어린이집',
        value: '2773',
      },
      {
        displayValue: '구미동호호어린이집',
        value: '2772',
      },
      {
        displayValue: '운중동아해뜰어린이집',
        value: '2771',
      },
      {
        displayValue: '운중동서교아이숲어린이집',
        value: '2770',
      },
      {
        displayValue: '판교동사랑나무어린이집',
        value: '2769',
      },
      {
        displayValue: '백현동알파리움숲어린이집',
        value: '2768',
      },
      {
        displayValue: '판교동행복한어린이집',
        value: '2767',
      },
      {
        displayValue: '서현동이자린어린이집',
        value: '2766',
      },
      {
        displayValue: '수내동삼육유치원',
        value: '2765',
      },
      {
        displayValue: '백현동알파리움어린이집',
        value: '2764',
      },
      {
        displayValue: '정자동비컴어학원',
        value: '2763',
      },
      {
        displayValue: '정자동분당구리틀타츠어학원',
        value: '2762',
      },
      {
        displayValue: '당산동온새미로어린이집',
        value: '2761',
      },
      {
        displayValue: '대방동우정어린이집',
        value: '2760',
      },
      {
        displayValue: '신길동우성유치원',
        value: '2759',
      },
      {
        displayValue: '대방동하랑어린이집',
        value: '2758',
      },
      {
        displayValue: '대방동쑥쑥어린이집',
        value: '2757',
      },
      {
        displayValue: '양평동하늘사랑어린이집',
        value: '2756',
      },
      {
        displayValue: '문래동현대어린이집',
        value: '2755',
      },
      {
        displayValue: '도림동리틀영일우리어린이집',
        value: '2754',
      },
      {
        displayValue: '신길동꿈이크는어린이집',
        value: '2753',
      },
      {
        displayValue: '영등포동동화나라어린이집',
        value: '2752',
      },
      {
        displayValue: '신길동은빛어린이집',
        value: '2751',
      },
      {
        displayValue: '도림동청구어린이집',
        value: '2750',
      },
      {
        displayValue: '신길동구립푸르름어린이집',
        value: '2749',
      },
      {
        displayValue: '양평동한신혜원유치원',
        value: '2748',
      },
      {
        displayValue: '당산동피터팬어린이집',
        value: '2747',
      },
      {
        displayValue: '양평동열린세상어린이집',
        value: '2746',
      },
      {
        displayValue: '양평동한신엄마품어린이집',
        value: '2745',
      },
      {
        displayValue: '여의도동CCES라이즈어학원',
        value: '2744',
      },
      {
        displayValue: '여의도동마이네임이즈비스어학원',
        value: '2743',
      },
      {
        displayValue: '여의도동비스어학원',
        value: '2742',
      },
      {
        displayValue: '여의도동침례유치원',
        value: '2741',
      },
      {
        displayValue: '신길동신라유치원',
        value: '2740',
      },
      {
        displayValue: '신길동남서울교회부설꿈이있는어린이집',
        value: '2739',
      },
      {
        displayValue: '대림동파랑새유치원',
        value: '2738',
      },
      {
        displayValue: '대림동건강한현대어린이집',
        value: '2737',
      },
      {
        displayValue: '도림동아트자이어린이집',
        value: '2736',
      },
      {
        displayValue: '마산동블레슈어린이집',
        value: '2735',
      },
      {
        displayValue: '마산동라온도담어린이집',
        value: '2734',
      },
      {
        displayValue: '마산동아이샘어린이집',
        value: '2733',
      },
      {
        displayValue: '김포시하나어린이집',
        value: '2732',
      },
      {
        displayValue: '김포시큰별어린이집',
        value: '2731',
      },
      {
        displayValue: '김포시그린숲어린이집',
        value: '2730',
      },
      {
        displayValue: '김포시행복가득한어린이집',
        value: '2729',
      },
      {
        displayValue: '구래동아이빅스맘어린이집',
        value: '2728',
      },
      {
        displayValue: '구래동아이파크어린이집',
        value: '2727',
      },
      {
        displayValue: '구래동에코비어린이집',
        value: '2726',
      },
      {
        displayValue: '구래동토마토어린이집',
        value: '2725',
      },
      {
        displayValue: '구래동도담어린이집',
        value: '2724',
      },
      {
        displayValue: '구래동동촌어린이집',
        value: '2723',
      },
      {
        displayValue: '구래동아이누리어린이집',
        value: '2722',
      },
      {
        displayValue: '구래동예미지어린이집',
        value: '2721',
      },
      {
        displayValue: '구래동예미지아이사랑어린이집',
        value: '2720',
      },
      {
        displayValue: '구래동나비마을어린이집',
        value: '2719',
      },
      {
        displayValue: '구래동코코맘어린이집',
        value: '2718',
      },
      {
        displayValue: '구래동모아엘가어린이집',
        value: '2717',
      },
      {
        displayValue: '구래동모아푸른어린이집',
        value: '2716',
      },
      {
        displayValue: '구래동모아엘가올리브어린이집',
        value: '2715',
      },
      {
        displayValue: '마산동힐스베베어린이집',
        value: '2714',
      },
      {
        displayValue: '마산동아이꿈어린이집',
        value: '2713',
      },
      {
        displayValue: '마산동하소로어린이집',
        value: '2712',
      },
      {
        displayValue: '마산동한강별어린이집',
        value: '2711',
      },
      {
        displayValue: '마산동단비어린이집',
        value: '2710',
      },
      {
        displayValue: '마산동이편한세상어린이집',
        value: '2709',
      },
      {
        displayValue: '당동은나래어린이집',
        value: '2708',
      },
      {
        displayValue: '당정동파란꿈어린이집',
        value: '2707',
      },
      {
        displayValue: '오전동아이와뜰어린이집',
        value: '2706',
      },
      {
        displayValue: '평촌동천사유치원',
        value: '2705',
      },
      {
        displayValue: '포일동예인어린이집',
        value: '2704',
      },
      {
        displayValue: '포일동리틀포일어린이집',
        value: '2703',
      },
      {
        displayValue: '별양동과천시라온어린이집',
        value: '2702',
      },
      {
        displayValue: '비산동관악어린이집',
        value: '2701',
      },
      {
        displayValue: '비산동프랜시스파커평촌캠퍼스',
        value: '2700',
      },
      {
        displayValue: '박달동한사랑어린이집',
        value: '2699',
      },
      {
        displayValue: '진관동진관라온어린이집',
        value: '2698',
      },
      {
        displayValue: '원흥동더채움어린이집',
        value: '2697',
      },
      {
        displayValue: '원흥동더봄어린이집',
        value: '2696',
      },
      {
        displayValue: '오금동다진유치원',
        value: '2695',
      },
      {
        displayValue: '신원동베라체어린이집',
        value: '2694',
      },
      {
        displayValue: '삼송동즐거운예향어린이집',
        value: '2693',
      },
      {
        displayValue: '삼송동아이다움어린이집',
        value: '2692',
      },
      {
        displayValue: '사리현동햇살몬테소리어린이집',
        value: '2691',
      },
      {
        displayValue: '사리현동해모아어린이집',
        value: '2690',
      },
      {
        displayValue: '사리현동개구쟁이어린이집',
        value: '2689',
      },
      {
        displayValue: '고양동아이꿈어린이집',
        value: '2688',
      },
      {
        displayValue: '가능동키즈미래어린이집',
        value: '2687',
      },
      {
        displayValue: '민락동보물섬어린이집',
        value: '2686',
      },
      {
        displayValue: '호원동아람어린이집',
        value: '2685',
      },
      {
        displayValue: '호원동엘사랑어린이집',
        value: '2684',
      },
      {
        displayValue: '호원동호원무지개어린이집',
        value: '2683',
      },
      {
        displayValue: '호원동꿈토실어린이집',
        value: '2682',
      },
      {
        displayValue: '의정부동예담어린이집',
        value: '2681',
      },
      {
        displayValue: '의정부동동화캐슬어린이집',
        value: '2680',
      },
      {
        displayValue: '호원동영재어린이집',
        value: '2679',
      },
      {
        displayValue: '의정부동온누리가정어린이집',
        value: '2678',
      },
      {
        displayValue: '의정부동참빛어린이집',
        value: '2677',
      },
      {
        displayValue: '민락동산들마을현대어린이집',
        value: '2676',
      },
      {
        displayValue: '용현동꿈가득어린이집',
        value: '2675',
      },
      {
        displayValue: '신곡동싱글벙글어린이집',
        value: '2674',
      },
      {
        displayValue: '신곡동꿈누리어린이집',
        value: '2673',
      },
      {
        displayValue: '신곡동사랑클나무어린이집',
        value: '2672',
      },
      {
        displayValue: '신곡동리틀키즈어린이집',
        value: '2671',
      },
      {
        displayValue: '신곡동예하키즈어린이집',
        value: '2670',
      },
      {
        displayValue: '금오동신나라어린이집',
        value: '2669',
      },
      {
        displayValue: '금오동로뎀나무어린이집',
        value: '2668',
      },
      {
        displayValue: '금오동금오신도어린이집',
        value: '2667',
      },
      {
        displayValue: '의정부동새로운어린이집',
        value: '2666',
      },
      {
        displayValue: '가능동포그니어린이집',
        value: '2665',
      },
      {
        displayValue: '녹양동꿈의숲어린이집',
        value: '2664',
      },
      {
        displayValue: '녹양동잼잼어린이집',
        value: '2663',
      },
      {
        displayValue: '가능동빛의어린이집',
        value: '2662',
      },
      {
        displayValue: '가능동해맑은예능아이어린이집',
        value: '2661',
      },
      {
        displayValue: '가능동인정어린이집',
        value: '2660',
      },
      {
        displayValue: '가능동포도나무어린이집',
        value: '2659',
      },
      {
        displayValue: '가능동초롱이어린이집',
        value: '2658',
      },
      {
        displayValue: '가능동햇살어린이집',
        value: '2657',
      },
      {
        displayValue: '원종동피터팬어린이집',
        value: '2656',
      },
      {
        displayValue: '오정동효마을어린이집',
        value: '2655',
      },
      {
        displayValue: '박촌동꿈에그린어린이집',
        value: '2654',
      },
      {
        displayValue: '병방동키즈빌어린이집',
        value: '2653',
      },
      {
        displayValue: '계산동노틀담유치원',
        value: '2652',
      },
      {
        displayValue: '작전동신나는어린이집',
        value: '2651',
      },
      {
        displayValue: '청라동청라보석어린이집',
        value: '2650',
      },
      {
        displayValue: '석남동바다유치원',
        value: '2649',
      },
      {
        displayValue: '석남동바다어린이집',
        value: '2648',
      },
      {
        displayValue: '석남동뿌리유치원',
        value: '2647',
      },
      {
        displayValue: '석남동더큰빛어린이집',
        value: '2646',
      },
      {
        displayValue: '가정동성모어린이집',
        value: '2645',
      },
      {
        displayValue: '송도동꼬마캐슬어린이집',
        value: '2644',
      },
      {
        displayValue: '주안동두리숲어린이집',
        value: '2643',
      },
      {
        displayValue: '주안동푸른나무어린이집',
        value: '2642',
      },
      {
        displayValue: '주안동용화어린이집',
        value: '2641',
      },
      {
        displayValue: '도화동글로벌수어린이집',
        value: '2640',
      },
      {
        displayValue: '용현동성신어린이집',
        value: '2639',
      },
      {
        displayValue: '용현동푸른숲어린이집',
        value: '2638',
      },
      {
        displayValue: '옥련동행복나무어린이집',
        value: '2637',
      },
      {
        displayValue: '옥련동영재어린이집',
        value: '2636',
      },
      {
        displayValue: '옥련동열린미래어린이집',
        value: '2635',
      },
      {
        displayValue: '동춘동부광예능유치원',
        value: '2634',
      },
      {
        displayValue: '동춘동다온어린이집',
        value: '2633',
      },
      {
        displayValue: '동춘동아기숲어린이집',
        value: '2632',
      },
      {
        displayValue: '선학동모아어린이집',
        value: '2631',
      },
      {
        displayValue: '논현동동산마을어린이집',
        value: '2630',
      },
      {
        displayValue: '만수동삼환어린이집',
        value: '2629',
      },
      {
        displayValue: '성사동비키어린이집',
        value: '2628',
      },
      {
        displayValue: '화정동해처럼어린이집',
        value: '2627',
      },
      {
        displayValue: '화정동프뢰벨어린이집',
        value: '2626',
      },
      {
        displayValue: '화정동은성어린이집',
        value: '2625',
      },
      {
        displayValue: '화정동안데르센어린이집',
        value: '2624',
      },
      {
        displayValue: '행신동한솔어린이집',
        value: '2623',
      },
      {
        displayValue: '행신동키움어린이집',
        value: '2622',
      },
      {
        displayValue: '행신동임마누엘몬테소리어린이집',
        value: '2621',
      },
      {
        displayValue: '행신동이삭유치원',
        value: '2620',
      },
      {
        displayValue: '행신동엘로이어린이집',
        value: '2619',
      },
      {
        displayValue: '행신동쑥쑥어린이집',
        value: '2618',
      },
      {
        displayValue: '토당동상명무지개유치원',
        value: '2617',
      },
      {
        displayValue: '성사동예쁜아이어린이집',
        value: '2616',
      },
      {
        displayValue: '성사동네오어린이집',
        value: '2615',
      },
      {
        displayValue: '성사동금자동이어린이집',
        value: '2614',
      },
      {
        displayValue: '향동동고양시늘품어린이집',
        value: '2613',
      },
      {
        displayValue: '불광동영산어린이집',
        value: '2612',
      },
      {
        displayValue: '갈현동아람어린이집',
        value: '2611',
      },
      {
        displayValue: '대조동솔로몬어린이집',
        value: '2610',
      },
      {
        displayValue: '역촌동백합유치원',
        value: '2609',
      },
      {
        displayValue: '신사동너울가지어린이집',
        value: '2608',
      },
      {
        displayValue: '신사동정다운아이들어린이집',
        value: '2607',
      },
      {
        displayValue: '응암동은평중앙어린이집',
        value: '2606',
      },
      {
        displayValue: '응암동하늘빛어린이집',
        value: '2605',
      },
      {
        displayValue: '녹번동리라어린이집',
        value: '2604',
      },
      {
        displayValue: '녹번동푸른아이어린이집',
        value: '2603',
      },
      {
        displayValue: '응암동다솜어린이집',
        value: '2602',
      },
      {
        displayValue: '응암동천사어린이집',
        value: '2601',
      },
      {
        displayValue: '응암동하은어린이집',
        value: '2600',
      },
      {
        displayValue: '응암동미래클나무어린이집',
        value: '2599',
      },
      {
        displayValue: '응암동은행나무어린이집',
        value: '2598',
      },
      {
        displayValue: '응암동사랑이어린이집',
        value: '2597',
      },
      {
        displayValue: '응암동성아유치원',
        value: '2596',
      },
      {
        displayValue: '증산동햇님어린이집',
        value: '2595',
      },
      {
        displayValue: '증산동선정어린이집',
        value: '2594',
      },
      {
        displayValue: '증산동우방꿈나무어린이집',
        value: '2593',
      },
      {
        displayValue: '수색동효림유치원',
        value: '2592',
      },
      {
        displayValue: '향동동꿈터어린이집',
        value: '2591',
      },
      {
        displayValue: '향동동고양시립청아어린이집',
        value: '2590',
      },
      {
        displayValue: '향동동고양시립라임어린이집',
        value: '2589',
      },
      {
        displayValue: '효창동상록어린이집',
        value: '2588',
      },
      {
        displayValue: '효창동TCIS어학원',
        value: '2587',
      },
      {
        displayValue: '하중동푸른숲어린이집',
        value: '2586',
      },
      {
        displayValue: '토정동삼성이솝어린이집',
        value: '2585',
      },
      {
        displayValue: '청파동청운어린이집',
        value: '2584',
      },
      {
        displayValue: '중동다솜어린이집',
        value: '2583',
      },
      {
        displayValue: '이촌동베베궁이촌학원',
        value: '2582',
      },
      {
        displayValue: '원효로1가더프라임어린이집',
        value: '2581',
      },
      {
        displayValue: '용강동리버파크지향어린이집',
        value: '2580',
      },
      {
        displayValue: '신공덕동돌샘유치원',
        value: '2579',
      },
      {
        displayValue: '신공덕동누리꿈어린이집',
        value: '2578',
      },
      {
        displayValue: '성산동캐비스쿨예랑어린이집',
        value: '2577',
      },
      {
        displayValue: '성산동이삭어린이집',
        value: '2576',
      },
      {
        displayValue: '성산동성산아트유치원',
        value: '2575',
      },
      {
        displayValue: '성산동노블온더힐',
        value: '2574',
      },
      {
        displayValue: '성산동깊은샘영재어린이집',
        value: '2573',
      },
      {
        displayValue: '문배동누리터어린이집',
        value: '2572',
      },
      {
        displayValue: '망원동아람에듀어린이집',
        value: '2571',
      },
      {
        displayValue: '도화동나무어린이집',
        value: '2570',
      },
      {
        displayValue: '대흥동리틀기쁜샘어린이집',
        value: '2569',
      },
      {
        displayValue: '우이동솔밭어린이집',
        value: '2568',
      },
      {
        displayValue: '수유동나이팅게일어린이집',
        value: '2567',
      },
      {
        displayValue: '미아동동심어린이집',
        value: '2566',
      },
      {
        displayValue: '수유동화계유치원',
        value: '2565',
      },
      {
        displayValue: '수유동유안유치원',
        value: '2564',
      },
      {
        displayValue: '수유동성실유치원',
        value: '2563',
      },
      {
        displayValue: '수유동성체유치원',
        value: '2562',
      },
      {
        displayValue: '쌍문동아이숲어린이집',
        value: '2561',
      },
      {
        displayValue: '쌍문동주은어린이집',
        value: '2560',
      },
      {
        displayValue: '창동사랑나무어린이집',
        value: '2559',
      },
      {
        displayValue: '창동신세인어린이집',
        value: '2558',
      },
      {
        displayValue: '쌍문동세인어린이집',
        value: '2557',
      },
      {
        displayValue: '쌍문동햇살마루어린이집',
        value: '2556',
      },
      {
        displayValue: '방학동참솔어린이집',
        value: '2555',
      },
      {
        displayValue: '도봉동아띠어린이집',
        value: '2554',
      },
      {
        displayValue: '도봉동유정어린이집',
        value: '2553',
      },
      {
        displayValue: '창동수정어린이집',
        value: '2552',
      },
      {
        displayValue: '창동키즈딸기어린이집',
        value: '2551',
      },
      {
        displayValue: '번동예찬어린이집',
        value: '2550',
      },
      {
        displayValue: '번동사무엘어린이집',
        value: '2549',
      },
      {
        displayValue: '번동두란노어린이집',
        value: '2548',
      },
      {
        displayValue: '옥정동봄이랑어린이집',
        value: '2547',
      },
      {
        displayValue: '옥정동노블아이어린이집',
        value: '2546',
      },
      {
        displayValue: '고암동주원어린이집',
        value: '2545',
      },
      {
        displayValue: '고암동새론어린이집',
        value: '2544',
      },
      {
        displayValue: '양주시예일유아스쿨어린이집',
        value: '2543',
      },
      {
        displayValue: '삼숭동젠아이어린이집',
        value: '2542',
      },
      {
        displayValue: '삼숭동예나자이어린이집',
        value: '2541',
      },
      {
        displayValue: '옥정동행복아이어린이집',
        value: '2540',
      },
      {
        displayValue: '옥정동솔비어린이집',
        value: '2539',
      },
      {
        displayValue: '옥정동아이편한어린이집',
        value: '2538',
      },
      {
        displayValue: '옥정동키즈브라운어린이집',
        value: '2537',
      },
      {
        displayValue: '옥정동이편한산내들어린이집',
        value: '2536',
      },
      {
        displayValue: '옥정동비쥬어린이집',
        value: '2535',
      },
      {
        displayValue: '옥정동옥정푸르지오어린이집',
        value: '2534',
      },
      {
        displayValue: '옥정동율정사랑어린이집',
        value: '2533',
      },
      {
        displayValue: '만송동황토어린이집',
        value: '2532',
      },
      {
        displayValue: '민락동다솜키즈어린이집',
        value: '2531',
      },
      {
        displayValue: '덕정동서희자연어린이집',
        value: '2530',
      },
      {
        displayValue: '민락동송양어린이집',
        value: '2529',
      },
      {
        displayValue: '고산동대방꼬마숲어린이집',
        value: '2528',
      },
      {
        displayValue: '고산동더휴별하어린이집',
        value: '2527',
      },
      {
        displayValue: '민락동호반행복한어린이집',
        value: '2526',
      },
      {
        displayValue: '민락동별사랑어린이집',
        value: '2525',
      },
      {
        displayValue: '낙양동유노어린이집',
        value: '2524',
      },
      {
        displayValue: '낙양동꼬마푸른꿈어린이집',
        value: '2523',
      },
      {
        displayValue: '낙양동금강고운어린이집',
        value: '2522',
      },
      {
        displayValue: '광사동엄마어린이집',
        value: '2521',
      },
      {
        displayValue: '고읍동아이자람어린이집',
        value: '2520',
      },
      {
        displayValue: '덕계동현진어린이집',
        value: '2519',
      },
      {
        displayValue: '덕계동범양어린이집',
        value: '2518',
      },
      {
        displayValue: '회정동회정어린이집',
        value: '2517',
      },
      {
        displayValue: '덕정동청담어린이집',
        value: '2516',
      },
      {
        displayValue: '덕정동서희천사어린이집',
        value: '2515',
      },
      {
        displayValue: '양주시꾸러기어린이집',
        value: '2514',
      },
      {
        displayValue: '양주시한솔어린이집',
        value: '2513',
      },
      {
        displayValue: '산곡동산곡사임당어린이집',
        value: '2512',
      },
      {
        displayValue: '부평동아침나라어린이집',
        value: '2511',
      },
      {
        displayValue: '갈산동이웃사랑어린이집',
        value: '2510',
      },
      {
        displayValue: '삼산동둥지어린이집',
        value: '2509',
      },
      {
        displayValue: '삼산동만나어린이집',
        value: '2508',
      },
      {
        displayValue: '삼산동예찬어린이집',
        value: '2507',
      },
      {
        displayValue: '삼산동엠코어린이집',
        value: '2506',
      },
      {
        displayValue: '삼산동산호어린이집',
        value: '2505',
      },
      {
        displayValue: '청천동베베어린이집',
        value: '2504',
      },
      {
        displayValue: '청천동대우미키어린이집',
        value: '2503',
      },
      {
        displayValue: '청천동한솔어린이집',
        value: '2502',
      },
      {
        displayValue: '청천동홍익유치원',
        value: '2501',
      },
      {
        displayValue: '청천동아이랑어린이집',
        value: '2500',
      },
      {
        displayValue: '청천동사랑이샘솟는어린이집',
        value: '2499',
      },
      {
        displayValue: '산곡동엘리더스어린이집',
        value: '2498',
      },
      {
        displayValue: '산곡동큰별아이어린이집',
        value: '2497',
      },
      {
        displayValue: '산곡동한화단단이어린이집',
        value: '2496',
      },
      {
        displayValue: '산곡동한화샛별어린이집',
        value: '2495',
      },
      {
        displayValue: '산곡동호산나어린이집',
        value: '2494',
      },
      {
        displayValue: '산곡동금호이수어린이집',
        value: '2493',
      },
      {
        displayValue: '산곡동산곡아이사랑어린이집',
        value: '2492',
      },
      {
        displayValue: '십정동행복한발도로프어린이집',
        value: '2491',
      },
      {
        displayValue: '십정동소나무어린이집',
        value: '2490',
      },
      {
        displayValue: '부평동친구사랑어린이집',
        value: '2489',
      },
      {
        displayValue: '부평동다인어린이집',
        value: '2488',
      },
      {
        displayValue: '부개동리라어린이집',
        value: '2487',
      },
      {
        displayValue: '부개동민들레어린이집',
        value: '2486',
      },
      {
        displayValue: '부개동새하늘어린이집',
        value: '2485',
      },
      {
        displayValue: '주엽동주엽어린이집',
        value: '2484',
      },
      {
        displayValue: '주엽동우리들어린이집',
        value: '2483',
      },
      {
        displayValue: '주엽동선아유치원',
        value: '2482',
      },
      {
        displayValue: '주엽동동산유치원',
        value: '2481',
      },
      {
        displayValue: '일산동현대아름드리어린이집',
        value: '2480',
      },
      {
        displayValue: '일산동아이캐슬어린이집',
        value: '2479',
      },
      {
        displayValue: '풍동해다미어린이집',
        value: '2478',
      },
      {
        displayValue: '풍동숲속오감놀이어린이집',
        value: '2477',
      },
      {
        displayValue: '중산동하늘꿈나무어린이집',
        value: '2476',
      },
      {
        displayValue: '중산동푸른하늘유치원',
        value: '2475',
      },
      {
        displayValue: '중산동키즈아이파크어린이집',
        value: '2474',
      },
      {
        displayValue: '중산동아이뜰어린이집',
        value: '2473',
      },
      {
        displayValue: '중산동꼬마둥지어린이집',
        value: '2472',
      },
      {
        displayValue: '정발산동주따라샘어린이집',
        value: '2471',
      },
      {
        displayValue: '정발산동곤지곤지어린이집',
        value: '2470',
      },
      {
        displayValue: '식사동초콜릿어린이집',
        value: '2469',
      },
      {
        displayValue: '백석동해피아이어린이집',
        value: '2468',
      },
      {
        displayValue: '백석동평화몬테소리어린이집',
        value: '2467',
      },
      {
        displayValue: '마두동호크마어린이집',
        value: '2466',
      },
      {
        displayValue: '마두동푸른숲어린이집',
        value: '2465',
      },
      {
        displayValue: '탄현동제니스키즈어린이집',
        value: '2464',
      },
      {
        displayValue: '탄현동산새어린이집',
        value: '2463',
      },
      {
        displayValue: '탄현동늘행복한어린이집',
        value: '2462',
      },
      {
        displayValue: '일산동바른유치원',
        value: '2461',
      },
      {
        displayValue: '일산동늘푸름유치원',
        value: '2460',
      },
      {
        displayValue: '일산동높푸른어린이집',
        value: '2459',
      },
      {
        displayValue: '덕이동키위어린이집',
        value: '2458',
      },
      {
        displayValue: '덕이동다올i어린이집',
        value: '2457',
      },
      {
        displayValue: '대화동파스텔키즈어린이집',
        value: '2456',
      },
      {
        displayValue: '대화동숲속에어린이집',
        value: '2455',
      },
      {
        displayValue: '대화동성저유치원',
        value: '2454',
      },
      {
        displayValue: '대화동사랑숲어린이집',
        value: '2453',
      },
      {
        displayValue: '대화동뽀로롱어린이집',
        value: '2452',
      },
      {
        displayValue: '대화동대화아람어린이집',
        value: '2451',
      },
      {
        displayValue: '가좌동초록벌어린이집',
        value: '2450',
      },
      {
        displayValue: '가좌동이레하바어린이집',
        value: '2449',
      },
      {
        displayValue: '가좌동대우사과나무어린이집',
        value: '2448',
      },
      {
        displayValue: '가좌동나래빅스맘어린이집',
        value: '2447',
      },
      {
        displayValue: '신대방동이편한세상어린이집',
        value: '2446',
      },
      {
        displayValue: '사당동예동영재어린이집',
        value: '2445',
      },
      {
        displayValue: '봉천동한솔어린이집',
        value: '2444',
      },
      {
        displayValue: '상도동삼성짐키드어린이집',
        value: '2443',
      },
      {
        displayValue: '사당동예주어린이집',
        value: '2442',
      },
      {
        displayValue: '상도동테리앤제니숭실원',
        value: '2441',
      },
      {
        displayValue: '상도동프레스티지어린이집',
        value: '2440',
      },
      {
        displayValue: '봉천동서강SLP관악어학원',
        value: '2439',
      },
      {
        displayValue: '봉천동현대유치원',
        value: '2438',
      },
      {
        displayValue: '상도동아띠어린이집',
        value: '2437',
      },
      {
        displayValue: '상도동예사랑어린이집',
        value: '2436',
      },
      {
        displayValue: '상도동동광어린이집',
        value: '2435',
      },
      {
        displayValue: '상도동모든삐아제어린이집',
        value: '2434',
      },
      {
        displayValue: '상도동YWCA또래또어린이집',
        value: '2433',
      },
      {
        displayValue: '상도동산들어린이집',
        value: '2432',
      },
      {
        displayValue: '상도동다솔어린이집',
        value: '2431',
      },
      {
        displayValue: '신대방동푸른숲어린이집',
        value: '2430',
      },
      {
        displayValue: '신대방동아이엠어린이집',
        value: '2429',
      },
      {
        displayValue: '신대방동상떼빌키즈어린이집',
        value: '2428',
      },
      {
        displayValue: '흑석동한강어린이집',
        value: '2427',
      },
      {
        displayValue: '흑석동청호어린이집',
        value: '2426',
      },
      {
        displayValue: '흑석동푸르미어린이집',
        value: '2425',
      },
      {
        displayValue: '흑석동해사랑어린이집',
        value: '2424',
      },
      {
        displayValue: '흑석동은혜어린이집',
        value: '2423',
      },
      {
        displayValue: '상도동승혜유치원',
        value: '2422',
      },
      {
        displayValue: '상도동리틀스텝어린이집',
        value: '2421',
      },
      {
        displayValue: '상도동예일어린이집',
        value: '2420',
      },
      {
        displayValue: '노량진동해나라어린이집',
        value: '2419',
      },
      {
        displayValue: '상도동건영어린이집',
        value: '2418',
      },
      {
        displayValue: '본동삼성숲어린이집',
        value: '2417',
      },
      {
        displayValue: '상도동노들어린이집',
        value: '2416',
      },
      {
        displayValue: '방배동프리오리어린이집',
        value: '2415',
      },
      {
        displayValue: '반포동반포퍼스티지하늘어린이집',
        value: '2414',
      },
      {
        displayValue: '반포동반포퍼스티지솔마을어린이집',
        value: '2413',
      },
      {
        displayValue: '잠원동플럼어학원',
        value: '2412',
      },
      {
        displayValue: '잠원동하나유치원',
        value: '2411',
      },
      {
        displayValue: '잠원동한신유치원',
        value: '2410',
      },
      {
        displayValue: '양재동양재천사유치원',
        value: '2409',
      },
      {
        displayValue: '우면동키즈랜드어린이집',
        value: '2408',
      },
      {
        displayValue: '서초동동화유치원',
        value: '2407',
      },
      {
        displayValue: '서초동석문유치원',
        value: '2406',
      },
      {
        displayValue: '반포동산성몬테소리어린이집',
        value: '2405',
      },
      {
        displayValue: '방배동우성어린이집',
        value: '2404',
      },
      {
        displayValue: '방배동이화어린이집',
        value: '2403',
      },
      {
        displayValue: '서초동서초3동어린이집',
        value: '2402',
      },
      {
        displayValue: '서초동수표교어린이집',
        value: '2401',
      },
      {
        displayValue: '방배동까리따스어린이집',
        value: '2400',
      },
      {
        displayValue: '반포동BSP어린이집',
        value: '2399',
      },
      {
        displayValue: '반포동리체꿈나라어린이집',
        value: '2398',
      },
      {
        displayValue: '동작동포레힐즈어린이집',
        value: '2397',
      },
      {
        displayValue: '사당동초록어린이집',
        value: '2396',
      },
      {
        displayValue: '사당동삼광어린이집',
        value: '2395',
      },
      {
        displayValue: '사당동피노키오어린이집',
        value: '2394',
      },
      {
        displayValue: '사당동두산위브어린이집',
        value: '2393',
      },
      {
        displayValue: '사당동로뎀나무어린이집',
        value: '2392',
      },
      {
        displayValue: '사당동샤론어린이집',
        value: '2391',
      },
      {
        displayValue: '사당동엘프어린이집',
        value: '2390',
      },
      {
        displayValue: '신림동다솜어린이집',
        value: '2389',
      },
      {
        displayValue: '신림동아이사랑어린이집',
        value: '2388',
      },
      {
        displayValue: '사당동자람어린이집',
        value: '2387',
      },
      {
        displayValue: '사당동예슬어린이집',
        value: '2386',
      },
      {
        displayValue: '포천시J아람어린이집',
        value: '2385',
      },
      {
        displayValue: '포천시열매어린이집',
        value: '2384',
      },
      {
        displayValue: '포천시작은씨앗어린이집',
        value: '2383',
      },
      {
        displayValue: '포천시송천어린이집',
        value: '2382',
      },
      {
        displayValue: '선단동동심어린이집',
        value: '2381',
      },
      {
        displayValue: '선단동동심유치원',
        value: '2380',
      },
      {
        displayValue: '선단동서일유치원',
        value: '2379',
      },
      {
        displayValue: '포천시연세어린이집',
        value: '2378',
      },
      {
        displayValue: '신읍동아람어린이집',
        value: '2377',
      },
      {
        displayValue: '신읍동아람유치원',
        value: '2376',
      },
      {
        displayValue: '중림동가명유치원',
        value: '2375',
      },
      {
        displayValue: '홍은동윤슬어린이집',
        value: '2374',
      },
      {
        displayValue: '홍제동현대홍익유치원',
        value: '2373',
      },
      {
        displayValue: '홍제동한솔키즈클럽어린이집',
        value: '2372',
      },
      {
        displayValue: '홍제동파랑새어린이집',
        value: '2371',
      },
      {
        displayValue: '홍제동예랑어린이집',
        value: '2370',
      },
      {
        displayValue: '홍제동엄마맘어린이집',
        value: '2369',
      },
      {
        displayValue: '홍은동플라토어학원',
        value: '2368',
      },
      {
        displayValue: '홍은동샛별어린이집',
        value: '2367',
      },
      {
        displayValue: '홍은동리틀소시에서대문상암원',
        value: '2366',
      },
      {
        displayValue: '현저동예꿈어린이집',
        value: '2365',
      },
      {
        displayValue: '현저동예꼴예능어린이집',
        value: '2364',
      },
      {
        displayValue: '천연동뜨란어린이집',
        value: '2363',
      },
      {
        displayValue: '영천동독립문어린이집',
        value: '2362',
      },
      {
        displayValue: '연희동홍연어린이집',
        value: '2361',
      },
      {
        displayValue: '연희동숲속몬테소리어린이집',
        value: '2360',
      },
      {
        displayValue: '신촌동대신어린이집',
        value: '2359',
      },
      {
        displayValue: '북아현동아현어린이집',
        value: '2358',
      },
      {
        displayValue: '북아현동동우어린이나라어린이집',
        value: '2357',
      },
      {
        displayValue: '북아현동꿈사랑어린이집',
        value: '2356',
      },
      {
        displayValue: '북가좌동두란노어린이집',
        value: '2355',
      },
      {
        displayValue: '냉천동성균관어린이집',
        value: '2354',
      },
      {
        displayValue: '남가좌동은혜감사어린이집',
        value: '2353',
      },
      {
        displayValue: '남가좌동삼성이화어린이집',
        value: '2352',
      },
      {
        displayValue: '돈암동영광유치원',
        value: '2351',
      },
      {
        displayValue: '종암동예다운어린이집',
        value: '2350',
      },
      {
        displayValue: '돈암동영암어린이집',
        value: '2349',
      },
      {
        displayValue: '돈암동희망찬유치원',
        value: '2348',
      },
      {
        displayValue: '종암동성복어린이집',
        value: '2347',
      },
      {
        displayValue: '종암동킨더트리어린이집',
        value: '2346',
      },
      {
        displayValue: '종암동좋은나라유치원',
        value: '2345',
      },
      {
        displayValue: '종암동사랑유치원',
        value: '2344',
      },
      {
        displayValue: '종암동청운어린이집',
        value: '2343',
      },
      {
        displayValue: '종암동정다운어린이집',
        value: '2342',
      },
      {
        displayValue: '종암동영재유치원',
        value: '2341',
      },
      {
        displayValue: '종암동우주래미안어린이집',
        value: '2340',
      },
      {
        displayValue: '하월곡동탑주유치원',
        value: '2339',
      },
      {
        displayValue: '장위동꿈땅어린이집',
        value: '2338',
      },
      {
        displayValue: '장위동새서울숲어린이집',
        value: '2337',
      },
      {
        displayValue: '장위동루첸키즈빌어린이집',
        value: '2336',
      },
      {
        displayValue: '장위동한마음유치원',
        value: '2335',
      },
      {
        displayValue: '길음동꿈터어린이집',
        value: '2334',
      },
      {
        displayValue: '길음동선한유치원',
        value: '2333',
      },
      {
        displayValue: '정릉동서울베네딕도유치원',
        value: '2332',
      },
      {
        displayValue: '보문동아뜰리에어린이집',
        value: '2331',
      },
      {
        displayValue: '보문동은영유치원',
        value: '2330',
      },
      {
        displayValue: '보문동은영어린이집',
        value: '2329',
      },
      {
        displayValue: '길음동나래유치원',
        value: '2328',
      },
      {
        displayValue: '정릉동한가람유치원',
        value: '2327',
      },
      {
        displayValue: '파주시아름솔어린이집',
        value: '2326',
      },
      {
        displayValue: '파주시아이원어린이집',
        value: '2325',
      },
      {
        displayValue: '파주시새싹어린이집',
        value: '2324',
      },
      {
        displayValue: '파주시모아키즈플러스어린이집',
        value: '2323',
      },
      {
        displayValue: '파주시글로벌리더스',
        value: '2322',
      },
      {
        displayValue: '파주시국제유치원',
        value: '2321',
      },
      {
        displayValue: '와동동시립가람어린이집',
        value: '2320',
      },
      {
        displayValue: '와동동벽산크니크니어린이집',
        value: '2319',
      },
      {
        displayValue: '와동동미술놀이터어린이집',
        value: '2318',
      },
      {
        displayValue: '야당동한빛i어린이집',
        value: '2317',
      },
      {
        displayValue: '아동동신안벧엘어린이집',
        value: '2316',
      },
      {
        displayValue: '문발동홉스쿨어학원',
        value: '2315',
      },
      {
        displayValue: '목동시립해솔어린이집',
        value: '2314',
      },
      {
        displayValue: '목동시립파크드림어린이집',
        value: '2313',
      },
      {
        displayValue: '목동산내아이자람어린이집',
        value: '2312',
      },
      {
        displayValue: '목동동아름드리어린이집',
        value: '2311',
      },
      {
        displayValue: '목동동산내마을10단지어린이집',
        value: '2310',
      },
      {
        displayValue: '동패동시립한울정원어린이집',
        value: '2309',
      },
      {
        displayValue: '동패동시립한울사랑어린이집',
        value: '2308',
      },
      {
        displayValue: '동패동시립아름드리어린이집',
        value: '2307',
      },
      {
        displayValue: '다율동파르세나키즈어린이집',
        value: '2306',
      },
      {
        displayValue: '다율동시립휴아림어린이집',
        value: '2305',
      },
      {
        displayValue: '금촌동세린어린이집',
        value: '2304',
      },
      {
        displayValue: '금촌동뽀뽀야어린이집',
        value: '2303',
      },
      {
        displayValue: '금촌동꿈누리어린이집',
        value: '2302',
      },
      {
        displayValue: '군문동주공예능어린이집',
        value: '2301',
      },
      {
        displayValue: '도창동옥길유치원(돌봄)',
        value: '2300',
      },
      {
        displayValue: '목동폴티스영어학원',
        value: '2299',
      },
      {
        displayValue: '감이동시립푸른솔어린이집',
        value: '2298',
      },
      {
        displayValue: '도창동꿈길유치원(돌봄)',
        value: '2297',
      },
      {
        displayValue: '신림동차반신성초등학교병설유치원지점(돌봄)',
        value: '2296',
      },
      {
        displayValue: '신림동차반신성초등학교지점(돌봄)',
        value: '2295',
      },
      {
        displayValue: '은행동은계유치원(돌봄)',
        value: '2294',
      },
      {
        displayValue: '망월동솔샘어린이집',
        value: '2293',
      },
      {
        displayValue: '역북동우남퍼스트빌통통어린이집',
        value: '2292',
      },
      {
        displayValue: '반포동(주)비아이에스어학원',
        value: '2291',
      },
      {
        displayValue: '산현동룰루사랑어린이집',
        value: '2290',
      },
      {
        displayValue: '목동에빙하우스어학원',
        value: '2289',
      },
      {
        displayValue: '용인시아이보듬어린이집',
        value: '2288',
      },
      {
        displayValue: '당하동아라서로어린이집',
        value: '2287',
      },
      {
        displayValue: '장곡동하솜어린이집',
        value: '2286',
      },
      {
        displayValue: '옥인동옥인유치원',
        value: '2285',
      },
      {
        displayValue: '화성시비봉어린이집',
        value: '2284',
      },
      {
        displayValue: '용산동국방부청사어린이집',
        value: '2283',
      },
      {
        displayValue: '마곡동마곡이화어린이집',
        value: '2282',
      },
      {
        displayValue: '소사동라이즈어학원평택소사벌캠퍼스',
        value: '2281',
      },
      {
        displayValue: '장곡동소리어린이집',
        value: '2280',
      },
      {
        displayValue: '길음동루이어학원',
        value: '2279',
      },
      {
        displayValue: '옥정동공립에듀포레어린이집',
        value: '2278',
      },
      {
        displayValue: '장곡동자연사랑어린이집',
        value: '2277',
      },
      {
        displayValue: '반포동서초구립라클라스어린이집',
        value: '2276',
      },
      {
        displayValue: '새솔동모아맘어린이집',
        value: '2275',
      },
      {
        displayValue: '토당동키즈브레인어린이집',
        value: '2274',
      },
      {
        displayValue: '풍산동하남랜퍼스',
        value: '2273',
      },
      {
        displayValue: '인창동베베어린이집',
        value: '2272',
      },
      {
        displayValue: '답십리동FTK영어학원',
        value: '2271',
      },
      {
        displayValue: '전농동우리동네키움센터7호점',
        value: '2270',
      },
      {
        displayValue: '답십리동우리동네키움센터4호점',
        value: '2269',
      },
      {
        displayValue: '전농동우리동네키움센터3호점',
        value: '2268',
      },
      {
        displayValue: '장안동우리동네키움센터2호점',
        value: '2267',
      },
      {
        displayValue: '소하동밝은빛유치원(돌봄)',
        value: '2266',
      },
      {
        displayValue: '수서동풀무원어린이집',
        value: '2265',
      },
      {
        displayValue: '상암동서부YMCA',
        value: '2264',
      },
      {
        displayValue: '행신동튼튼어린이집',
        value: '2263',
      },
      {
        displayValue: '옥정동공립자연유아풍경채어린이집',
        value: '2262',
      },
      {
        displayValue: '오산동스토리헤롯어학원',
        value: '2261',
      },
      {
        displayValue: '산곡동아이랑어린이집',
        value: '2260',
      },
      {
        displayValue: '마산동이편한로이어린이집',
        value: '2259',
      },
      {
        displayValue: '양재동숙명킨더아카데미학원',
        value: '2258',
      },
      {
        displayValue: '신수동마포지엠어학원',
        value: '2257',
      },
      {
        displayValue: '대화동젬스톤',
        value: '2256',
      },
      {
        displayValue: '성복동인투어학원',
        value: '2255',
      },
      {
        displayValue: '산척동인투어학원',
        value: '2254',
      },
      {
        displayValue: '원효로4가키스톤어학원',
        value: '2253',
      },
      {
        displayValue: '수내동비아이에스어학원',
        value: '2252',
      },
      {
        displayValue: '신사동리비어어학원',
        value: '2251',
      },
      {
        displayValue: '청라동ECC청라지점',
        value: '2250',
      },
      {
        displayValue: '등촌동폴리어학원',
        value: '2249',
      },
      {
        displayValue: '다율동라이즈어학원',
        value: '2248',
      },
      {
        displayValue: '중산동아둘람꼬꼬마',
        value: '2247',
      },
      {
        displayValue: '목동해이몬학원',
        value: '2246',
      },
      {
        displayValue: '원효로1가용산세인트메리주니어',
        value: '2245',
      },
      {
        displayValue: '원당동검단라이즈어학원',
        value: '2244',
      },
      {
        displayValue: '회정동나무숲어린이집',
        value: '2243',
      },
      {
        displayValue: '옥정동공립행복플러스어린이집',
        value: '2242',
      },
      {
        displayValue: '역곡동퐁피두창의스쿨어린이집',
        value: '2241',
      },
      {
        displayValue: '산곡동양지예빛어린이집',
        value: '2240',
      },
      {
        displayValue: '보정동별빛누리어린이집',
        value: '2239',
      },
      {
        displayValue: '서초동비씨씨주니어어학원',
        value: '2238',
      },
      {
        displayValue: '새솔동새솔아이비어린이집',
        value: '2237',
      },
      {
        displayValue: '도마교동소풍가는어린이집',
        value: '2236',
      },
      {
        displayValue: '홍은1동새벽산어린이집',
        value: '2235',
      },
      {
        displayValue: '일산동생각하는어린이집',
        value: '2234',
      },
      {
        displayValue: '영통동별초롱어린이집',
        value: '2233',
      },
      {
        displayValue: '장안동세하유치원',
        value: '2232',
      },
      {
        displayValue: '사당동러브락아트포레듀',
        value: '2231',
      },
      {
        displayValue: '감일동미리별어린이집',
        value: '2230',
      },
      {
        displayValue: '가정동국공립루원포레나어린이집',
        value: '2229',
      },
      {
        displayValue: '봉천동폴리어학원관악캠퍼스',
        value: '2228',
      },
      {
        displayValue: '금호동열린금호유아체능단',
        value: '2227',
      },
      {
        displayValue: '동작라이즈',
        value: '2226',
      },
      {
        displayValue: '분당MB',
        value: '2225',
      },
      {
        displayValue: '럭스어학원',
        value: '2224',
      },
      {
        displayValue: '운정POLY',
        value: '2223',
      },
      {
        displayValue: '대치POLY',
        value: '2222',
      },
      {
        displayValue: '산본동위씽아트어린이집',
        value: '2221',
      },
      {
        displayValue: '개포동메이플베어강남',
        value: '2220',
      },
      {
        displayValue: '신정동알티오라목동2관',
        value: '2219',
      },
      {
        displayValue: '대흥동티앤티키즈파크어학원',
        value: '2218',
      },
      {
        displayValue: '천천동수원성민학교',
        value: '2217',
      },
      {
        displayValue: '금촌동꿈사랑어린이집',
        value: '2216',
      },
      {
        displayValue: '반송동자연어린이집',
        value: '2215',
      },
      {
        displayValue: '신당동폴리어학원',
        value: '2214',
      },
      {
        displayValue: '감정동아이뜰어린이집',
        value: '2213',
      },
      {
        displayValue: '청라동봄빛어린이집',
        value: '2212',
      },
      {
        displayValue: '배곧동레인보우서적',
        value: '2211',
      },
      {
        displayValue: '영통동그린나래어린이집',
        value: '2210',
      },
      {
        displayValue: '신길동창의예원어린이집',
        value: '2209',
      },
      {
        displayValue: '옥길동프랜시스파커어학원',
        value: '2208',
      },
      {
        displayValue: '자양동사임당어린이집',
        value: '2207',
      },
      {
        displayValue: '장기동튼튼어린이집',
        value: '2206',
      },
      {
        displayValue: '중동온누리중동어린이집',
        value: '2205',
      },
      {
        displayValue: '중동오즈의마법사어린이집',
        value: '2204',
      },
      {
        displayValue: '중동아이린어린이집',
        value: '2203',
      },
      {
        displayValue: '상동폴리어학원부천캠퍼스',
        value: '2202',
      },
      {
        displayValue: '서현동스토리헤롯분당본원',
        value: '2201',
      },
      {
        displayValue: '하왕십리동성동ECC어학원',
        value: '2200',
      },
      {
        displayValue: '구의동아이짐어린이집',
        value: '2199',
      },
      {
        displayValue: '하안동초록나라어린이집',
        value: '2198',
      },
      {
        displayValue: '키즈락',
        value: '2197',
      },
      {
        displayValue: '키즈밀',
        value: '2196',
      },
      {
        displayValue: '원곡동토마스어린이집',
        value: '2195',
      },
      {
        displayValue: '장곡동예쁜숲속어린이집',
        value: '2194',
      },
      {
        displayValue: '목동비츠스쿨어학원',
        value: '2193',
      },
      {
        displayValue: '목동나다움에듀케이션종합학원',
        value: '2192',
      },
      {
        displayValue: '신정동알티오라페타무스목동어학원',
        value: '2191',
      },
      {
        displayValue: '신정동라온놀이미술어학원',
        value: '2190',
      },
      {
        displayValue: '목동SLP',
        value: '2189',
      },
      {
        displayValue: '마곡동리틀원더스어학원',
        value: '2188',
      },
      {
        displayValue: '상동햇살나무어린이집',
        value: '2187',
      },
      {
        displayValue: '원미동참다솔어린이집',
        value: '2186',
      },
      {
        displayValue: '내동하늘산어린이집',
        value: '2185',
      },
      {
        displayValue: '약대동리틀아이꿈어린이집',
        value: '2184',
      },
      {
        displayValue: '상동아이원어린이집',
        value: '2183',
      },
      {
        displayValue: '상동아기별어린이집',
        value: '2182',
      },
      {
        displayValue: '송내동목화유치원',
        value: '2181',
      },
      {
        displayValue: '송내동열린유치원',
        value: '2180',
      },
      {
        displayValue: '마전동무지개유치원',
        value: '2179',
      },
      {
        displayValue: '불로동THE즐거운어린이집',
        value: '2178',
      },
      {
        displayValue: '영통동수정맘어린이집',
        value: '2177',
      },
      {
        displayValue: '영통동슬기어린이집',
        value: '2176',
      },
      {
        displayValue: '상현동송화프렌드어린이집',
        value: '2175',
      },
      {
        displayValue: '풍덕천동진산키즈어린이집',
        value: '2174',
      },
      {
        displayValue: '보정동용인서부경찰서어린이집',
        value: '2173',
      },
      {
        displayValue: '죽전동해닮어린이집',
        value: '2172',
      },
      {
        displayValue: '청덕동은빛어린이집',
        value: '2171',
      },
      {
        displayValue: '유방동아가둥지어린이집',
        value: '2170',
      },
      {
        displayValue: '지곡동GLC아카데미',
        value: '2169',
      },
      {
        displayValue: '기안동마법같은세상어린이집',
        value: '2168',
      },
      {
        displayValue: '산척동세인트폴동탄',
        value: '2167',
      },
      {
        displayValue: '산척동라이즈동탄2어학원',
        value: '2166',
      },
      {
        displayValue: '반송동라이즈동탄1어학원',
        value: '2165',
      },
      {
        displayValue: '병점동정든어린이집',
        value: '2164',
      },
      {
        displayValue: '반송동예꼬어린이집',
        value: '2163',
      },
      {
        displayValue: '다산동다산아이랑어린이집',
        value: '2162',
      },
      {
        displayValue: '갈매동청담어린이집',
        value: '2161',
      },
      {
        displayValue: '다산동SSL다산캠퍼스',
        value: '2160',
      },
      {
        displayValue: '다산동부영아이랑어린이집',
        value: '2159',
      },
      {
        displayValue: '도곡동발레앤모델어학원',
        value: '2158',
      },
      {
        displayValue: '신천동아이가르텐',
        value: '2157',
      },
      {
        displayValue: '방이동알티오라송파캠퍼스',
        value: '2156',
      },
      {
        displayValue: '오금동올리송파원',
        value: '2155',
      },
      {
        displayValue: '석촌동스토리헤롯',
        value: '2154',
      },
      {
        displayValue: '수서동강남데시앙포레어린이집',
        value: '2153',
      },
      {
        displayValue: '개포동청담아이가르텐(대치)',
        value: '2152',
      },
      {
        displayValue: '청담동청담아이가르텐(본점)',
        value: '2151',
      },
      {
        displayValue: '논현동GIA어학원',
        value: '2150',
      },
      {
        displayValue: '고등동한성제2어린이집',
        value: '2149',
      },
      {
        displayValue: '장안동하바놀이어학원',
        value: '2148',
      },
      {
        displayValue: '중곡동구립중곡샛별어린이집',
        value: '2147',
      },
      {
        displayValue: '남양주시꿈별어린이집',
        value: '2146',
      },
      {
        displayValue: '호평동중흥도담도담어린이집',
        value: '2145',
      },
      {
        displayValue: '망월동도담어린이집',
        value: '2144',
      },
      {
        displayValue: '명일동아이비어린이집',
        value: '2143',
      },
      {
        displayValue: '화양동구립화송어린이집',
        value: '2142',
      },
      {
        displayValue: '옥수동올리성동원',
        value: '2141',
      },
      {
        displayValue: '망월동시립미사강변골든센트로어린이집',
        value: '2140',
      },
      {
        displayValue: '판교동ECC어학원',
        value: '2139',
      },
      {
        displayValue: '영등포동아이세상어린이집',
        value: '2138',
      },
      {
        displayValue: '여의도동CLS어학원',
        value: '2137',
      },
      {
        displayValue: '대림동SLP영등포학당',
        value: '2136',
      },
      {
        displayValue: '대림동파란나라유치원',
        value: '2135',
      },
      {
        displayValue: '호계동엄지어린이집',
        value: '2134',
      },
      {
        displayValue: '산본동꿈땅숲어린이집',
        value: '2133',
      },
      {
        displayValue: '관양동관양어린이집',
        value: '2132',
      },
      {
        displayValue: '안양동덕천어린이집',
        value: '2131',
      },
      {
        displayValue: '안양동밝은빛어린이집',
        value: '2130',
      },
      {
        displayValue: '안양동평강어린이집',
        value: '2129',
      },
      {
        displayValue: '진관동어울림어린이집',
        value: '2128',
      },
      {
        displayValue: '삼송동바다나무잉글리시어학원',
        value: '2127',
      },
      {
        displayValue: '고양동키즈스타어린이집',
        value: '2126',
      },
      {
        displayValue: '고양동아이천사어린이집',
        value: '2125',
      },
      {
        displayValue: '고양동꿈의요정어린이집',
        value: '2124',
      },
      {
        displayValue: '신곡동꼬마사랑어린이집',
        value: '2123',
      },
      {
        displayValue: '작전동우림카이저어린이집',
        value: '2122',
      },
      {
        displayValue: '효성동예그랑유치원',
        value: '2121',
      },
      {
        displayValue: '효성동자연유치원',
        value: '2120',
      },
      {
        displayValue: '청라동동양엔파트어린이집',
        value: '2119',
      },
      {
        displayValue: '석남동윤슬어린이집',
        value: '2118',
      },
      {
        displayValue: '송도동가온어린이집',
        value: '2117',
      },
      {
        displayValue: '동춘동엘림어린이집',
        value: '2116',
      },
      {
        displayValue: '화정동별빛키즈어린이집',
        value: '2115',
      },
      {
        displayValue: '행신동하늘별어린이집',
        value: '2114',
      },
      {
        displayValue: '행신동꼬마루소어린이집',
        value: '2113',
      },
      {
        displayValue: '한남동SLS어학원',
        value: '2112',
      },
      {
        displayValue: '한남동SNS어학원',
        value: '2111',
      },
      {
        displayValue: '서교동아트꼼포지트학원',
        value: '2110',
      },
      {
        displayValue: '대흥동아이들이야기어학원',
        value: '2109',
      },
      {
        displayValue: '대흥동다운진어학원',
        value: '2108',
      },
      {
        displayValue: '삼숭동아이엠피카소어린이집',
        value: '2107',
      },
      {
        displayValue: '옥정동아람어린이집',
        value: '2106',
      },
      {
        displayValue: '민락동다솜아이어린이집',
        value: '2105',
      },
      {
        displayValue: '광사동유경브래뉴어린이집',
        value: '2104',
      },
      {
        displayValue: '만송동예담어린이집',
        value: '2103',
      },
      {
        displayValue: '고암동천사랑어린이집',
        value: '2102',
      },
      {
        displayValue: '고암동예사랑어린이집',
        value: '2101',
      },
      {
        displayValue: '청천동청천푸르지오어린이집',
        value: '2100',
      },
      {
        displayValue: '청천동에벤에셀어린이집',
        value: '2099',
      },
      {
        displayValue: '산곡동예꼬어린이집',
        value: '2098',
      },
      {
        displayValue: '주엽동엄마품어린이집',
        value: '2097',
      },
      {
        displayValue: '주엽동국제어린이집',
        value: '2096',
      },
      {
        displayValue: '일산동도담도담어린이집',
        value: '2095',
      },
      {
        displayValue: '대화동일산비전키즈어린이집',
        value: '2094',
      },
      {
        displayValue: '대화동성저꼬맹이어린이집',
        value: '2093',
      },
      {
        displayValue: '대화동꼬맹이어린이집',
        value: '2092',
      },
      {
        displayValue: '가좌동가좌국제어린이집',
        value: '2091',
      },
      {
        displayValue: '서초동엘리트리에스비어학원',
        value: '2090',
      },
      {
        displayValue: '반포동토토빌',
        value: '2089',
      },
      {
        displayValue: '사당동이루다키즈컬리지잇',
        value: '2088',
      },
      {
        displayValue: '포천시태봉반디어린이집',
        value: '2087',
      },
      {
        displayValue: '포천시산내들도담어린이집',
        value: '2086',
      },
      {
        displayValue: '포천시산내들어린이집',
        value: '2085',
      },
      {
        displayValue: '홍은동JMC자아몬테소리어린이집',
        value: '2084',
      },
      {
        displayValue: '북가좌동에쥬니티씨엘어학원',
        value: '2083',
      },
      {
        displayValue: '길음동루이유치원',
        value: '2082',
      },
      {
        displayValue: '동소문동성북SLP',
        value: '2081',
      },
      {
        displayValue: '아동동꿈꾸는아이들팜스어린이집',
        value: '2080',
      },
      {
        displayValue: '동패동톰과제리어린이집',
        value: '2079',
      },
    ],
  },
  {
    displayValue: '강도',
    value: 'claim_level',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '일반',
        value: 'NORMAL',
      },
      {
        displayValue: '소프트',
        value: 'SOFT',
      },
      {
        displayValue: '헤비',
        value: 'HEAVY',
      },
    ],
  },
  {
    displayValue: '카테고리',
    value: 'category',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '위생',
        value: '1',
      },
      {
        displayValue: '운송',
        value: '2',
      },
      {
        displayValue: '파손',
        value: '3',
      },
      {
        displayValue: '포장',
        value: '4',
      },
      {
        displayValue: '서비스불만',
        value: '5',
      },
      {
        displayValue: '계약불만',
        value: '6',
      },
      {
        displayValue: '단순요청',
        value: '7',
      },
      {
        displayValue: '피드백',
        value: '8',
      },
    ],
  },
  {
    displayValue: '굿즈(제품)',
    value: 'goods',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '멜라민 식판',
        value: 'GDS000001',
      },
      {
        displayValue: '원형 식판',
        value: 'GDS000002',
      },
      {
        displayValue: '스텐 식판',
        value: 'GDS000003',
      },
      {
        displayValue: '국그릇',
        value: 'GDS000004',
      },
      {
        displayValue: '수저',
        value: 'GDS000005',
      },
      {
        displayValue: '빈박스(파란색)',
        value: 'GDS000006',
      },
      {
        displayValue: '빈박스(녹색)',
        value: 'GDS000007',
      },
      {
        displayValue: '빈박스(노란뚜껑)',
        value: 'GDS000008',
      },
      {
        displayValue: '빈박스(원형40)',
        value: 'GDS000009',
      },
      {
        displayValue: '빈박스(회색)',
        value: 'GDS000010',
      },
      {
        displayValue: '빈박스(수저)',
        value: 'GDS000011',
      },
      {
        displayValue: '빈박스(키즈)',
        value: 'GDS000012',
      },
      {
        displayValue: '빈박스(키즈세트)',
        value: 'GDS000013',
      },
      {
        displayValue: '키즈 스텐 식판',
        value: 'GDS000014',
      },
      {
        displayValue: '키즈 스텐 간식기',
        value: 'GDS000015',
      },
      {
        displayValue: '키즈 스텐 숟가락',
        value: 'GDS000016',
      },
      {
        displayValue: '키즈 스텐 포크',
        value: 'GDS000017',
      },
      {
        displayValue: '키즈 스텐 젓가락',
        value: 'GDS000018',
      },
      {
        displayValue: '양식 식판',
        value: 'GDS000019',
      },
      {
        displayValue: '빈박스(진녹색)',
        value: 'GDS000020',
      },
      {
        displayValue: '숟가락',
        value: 'GDS000021',
      },
      {
        displayValue: '빈박스(초록뚜껑)',
        value: 'GDS000022',
      },
      {
        displayValue: '4찬 식판 A형',
        value: 'GDS000023',
      },
      {
        displayValue: '빈박스(검은뚜껑)',
        value: 'GDS000024',
      },
      {
        displayValue: '국그릇(CJ)',
        value: 'GDS000025',
      },
      {
        displayValue: '빈박스(CJ)',
        value: 'GDS000026',
      },
      {
        displayValue: '빈박스(원형50)',
        value: 'GDS000027',
      },
    ],
  },
  {
    displayValue: '발생일',
    value: 'incident_happened_at',
    type: 'date_range',
  },
  {
    displayValue: '등록일',
    value: 'created_at',
    type: 'date_range',
  },
  {
    displayValue: '생산일',
    value: 'production_date',
    type: 'date',
  },
  {
    displayValue: '생산 팩토리',
    value: 'production_factory',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '광명A',
        value: '광명A',
      },
      {
        displayValue: '광명B',
        value: '광명B',
      },
      {
        displayValue: '광명C',
        value: '광명C',
      },
      {
        displayValue: '광명D',
        value: '광명D',
      },
      {
        displayValue: '화성A',
        value: '화성A',
      },
      {
        displayValue: '화성B',
        value: '화성B',
      },
      {
        displayValue: '친한용기',
        value: '친한용기',
      },
      {
        displayValue: '나로',
        value: '나로',
      },
      {
        displayValue: '라라워시',
        value: '라라워시',
      },
      {
        displayValue: '더좋은식판',
        value: '더좋은식판',
      },
      {
        displayValue: '키움이엔지',
        value: '키움이엔지',
      },
      {
        displayValue: '버블클린',
        value: '버블클린',
      },
    ],
  },
  {
    displayValue: '생산 시프트',
    value: 'production_shift',
    type: 'multi_select',
    selectableValues: [
      {
        displayValue: '주간',
        value: 'DAY',
      },
      {
        displayValue: '야간',
        value: 'NIGHT',
      },
    ],
  },
];

const toggleOptions = [
  {
    value: 'EMERGENCY',
    displayValue: '긴급 건만 보기',
  },
];

export const Default: Story = {
  render: () => {
    const [selectValues, setSelectValues] =
      useState<FilterProps['selectValues']>();
    const [toggleValues, setToggleValues] =
      useState<FilterProps['toggleValues']>();

    const onChange = (value: FilterOnChangeParams) => {
      setSelectValues(value.selectValues);
      setToggleValues(value.toggleValues);
    };

    const _toggleOptions = toggleOptions.map(
      (option) =>
        ({
          label: option.displayValue,
          key: option.value,
        }) as FilterToggleOption,
    );

    const _selectOptions = filterOptions.map((option) => {
      const _options = {
        label: option.displayValue,
        key: option.value,
        type: option.type,
      } as FilterSelectOptions;

      if (option.selectableValues) {
        _options.options = option.selectableValues.map((value) => ({
          displayValue: value.displayValue,
          value: value.value,
        }));
      }

      return _options;
    });

    return (
      <Filter
        label='Filter'
        selectOptions={_selectOptions}
        selectValues={selectValues}
        toggleOptions={_toggleOptions}
        toggleValues={toggleValues}
        onChange={onChange}
      />
    );
  },
};
