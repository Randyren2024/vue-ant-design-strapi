<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t, locale } = useI18n();

// 定义各页面的SEO元数据
const seoData = ref({
  'home': {
    'zh-CN': {
      title: '氢燃料电池无人机 | 擎天H100 | 青鸾H25 | 麒麟HiTS系列',
      description: '专业氢燃料电池无人机解决方案提供商，产品包括擎天H100重载无人机、青鸾H25轻型无人机和麒麟HiTS系列氢燃料电池系统，具有长时续航、高效能源、绿色环保特点。',
      keywords: '氢燃料电池无人机,氢能无人机,长时续航,高效能源,绿色环保,工业应用,巡检无人机,擎天H100,青鸾H25,麒麟HiTS'
    },
    'en-US': {
      title: 'Hydrogen Fuel Cell Drones | HydroSky H100 | HydroPhoenix H25 | HydroKirin HiTS Series',
      description: 'Professional hydrogen fuel cell drone solution provider, featuring HydroSky H100 heavy-duty drone, HydroPhoenix H25 lightweight drone, and HydroKirin HiTS series hydrogen fuel cell systems with long flight duration, high energy efficiency, and eco-friendly features.',
      keywords: 'hydrogen fuel cell drone,hydrogen powered UAV,long flight duration,high energy density,green energy,industrial applications,inspection drone,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS'
    },
    'fr-FR': {
      title: 'Drones à Pile à Combustible à Hydrogène | HydroSky H100 | HydroPhoenix H25 | Série HydroKirin HiTS',
      description: 'Fournisseur professionnel de solutions de drones à pile à combustible à hydrogène, proposant le drone lourd HydroSky H100, le drone léger HydroPhoenix H25 et les systèmes de pile à combustible HydroKirin HiTS avec une longue autonomie de vol, une efficacité énergétique élevée et des caractéristiques respectueuses de l\'environnement.',
      keywords: 'drone à hydrogène,pile à combustible,longue autonomie,haute densité énergétique,énergie verte,applications industrielles,drone d\'inspection,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS'
    },
    'ja-JP': {
      title: '水素燃料電池ドローン | ハイドロスカイH100 | ハイドロフェニックスH25 | ハイドロキリンHiTSシリーズ',
      description: 'プロフェッショナルな水素燃料電池ドローンソリューションプロバイダー。長時間飛行、高エネルギー効率、環境に優しい特徴を持つハイドロスカイH100重量級ドローン、ハイドロフェニックスH25軽量ドローン、ハイドロキリンHiTSシリーズ水素燃料電池システムを提供しています。',
      keywords: '水素燃料電池ドローン,水素動力UAV,長時間飛行,高エネルギー密度,グリーンエネルギー,産業用途,点検ドローン,ハイドロスカイH100,ハイドロフェニックスH25,ハイドロキリンHiTS'
    },
    'es-ES': {
      title: 'Drones de Celda de Combustible de Hidrógeno | HydroSky H100 | HydroPhoenix H25 | Serie HydroKirin HiTS',
      description: 'Proveedor profesional de soluciones de drones con celdas de combustible de hidrógeno, con el dron de trabajo pesado HydroSky H100, el dron ligero HydroPhoenix H25 y los sistemas de celdas de combustible de hidrógeno de la serie HydroKirin HiTS con larga duración de vuelo, alta eficiencia energética y características ecológicas.',
      keywords: 'dron de celda de combustible de hidrógeno,UAV propulsado por hidrógeno,larga duración de vuelo,alta densidad energética,energía verde,aplicaciones industriales,dron de inspección,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS'
    },
    'de-DE': {
      title: 'Wasserstoff-Brennstoffzellen-Drohnen | HydroSky H100 | HydroPhoenix H25 | HydroKirin HiTS Serie',
      description: 'Professioneller Anbieter von Wasserstoff-Brennstoffzellen-Drohnenlösungen mit der schweren HydroSky H100 Drohne, der leichten HydroPhoenix H25 Drohne und den HydroKirin HiTS-Serien-Wasserstoff-Brennstoffzellensystemen mit langer Flugdauer, hoher Energieeffizienz und umweltfreundlichen Eigenschaften.',
      keywords: 'Wasserstoff-Brennstoffzellen-Drohne,wasserstoffbetriebene UAV,lange Flugdauer,hohe Energiedichte,grüne Energie,industrielle Anwendungen,Inspektionsdrohne,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS'
    }
  },
  'products': {
    'zh-CN': {
      title: '氢燃料电池无人机产品 | 高性能无人机和氢能源系统',
      description: '我们提供高性能氢燃料电池无人机产品，包括擎天H100重载无人机、青鸾H25轻型无人机和麒麟HiTS系列氢燃料电池系统，具有长时续航和高效能源特点。',
      keywords: '氢燃料电池无人机,氢能无人机产品,工业级无人机,擎天H100,青鸾H25,麒麟HiTS,长时续航无人机,氢动力系统'
    },
    'en-US': {
      title: 'Hydrogen Fuel Cell Drone Products | High-Performance UAVs and Hydrogen Energy Systems',
      description: 'We offer high-performance hydrogen fuel cell drone products, including HydroSky H100 heavy-duty drone, HydroPhoenix H25 lightweight drone, and HydroKirin HiTS series hydrogen fuel cell systems with long flight duration and high energy efficiency features.',
      keywords: 'hydrogen fuel cell drone products,hydrogen powered UAVs,industrial drones,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS,long endurance drone,hydrogen power system'
    },
    'fr-FR': {
      title: 'Produits de Drones à Pile à Combustible à Hydrogène | UAV Haute Performance et Systèmes d\'Énergie à Hydrogène',
      description: 'Nous proposons des produits de drones à pile à combustible à hydrogène haute performance, comprenant le drone lourd HydroSky H100, le drone léger HydroPhoenix H25 et les systèmes de pile à combustible HydroKirin HiTS avec une longue autonomie de vol et des caractéristiques d\'efficacité énergétique élevée.',
      keywords: 'produits de drone à hydrogène,UAV à pile à combustible,drones industriels,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS,drone longue endurance,système d\'alimentation à hydrogène'
    },
    'ja-JP': {
      title: '水素燃料電池ドローン製品 | 高性能UAVと水素エネルギーシステム',
      description: '当社は高性能水素燃料電池ドローン製品を提供しており、ハイドロスカイH100重量級ドローン、ハイドロフェニックスH25軽量ドローン、長時間飛行と高エネルギー効率機能を持つハイドロキリンHiTSシリーズ水素燃料電池システムを含みます。',
      keywords: '水素燃料電池ドローン製品,水素動力UAV,産業用ドローン,ハイドロスカイH100,ハイドロフェニックスH25,ハイドロキリンHiTS,長時間飛行ドローン,水素動力システム'
    },
    'es-ES': {
      title: 'Productos de Drones de Celda de Combustible de Hidrógeno | UAVs de Alto Rendimiento y Sistemas de Energía de Hidrógeno',
      description: 'Ofrecemos productos de drones de celda de combustible de hidrógeno de alto rendimiento, incluido el dron pesado HydroSky H100, el dron ligero HydroPhoenix H25 y los sistemas de celda de combustible de hidrógeno de la serie HydroKirin HiTS con características de larga duración de vuelo y alta eficiencia energética.',
      keywords: 'productos de drones de celda de combustible de hidrógeno,UAVs propulsados por hidrógeno,drones industriales,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS,dron de larga resistencia,sistema de energía de hidrógeno'
    },
    'de-DE': {
      title: 'Wasserstoff-Brennstoffzellen-Drohnenprodukte | Hochleistungs-UAVs und Wasserstoff-Energiesysteme',
      description: 'Wir bieten hochleistungsfähige Wasserstoff-Brennstoffzellen-Drohnenprodukte an, darunter die schwere HydroSky H100 Drohne, die leichte HydroPhoenix H25 Drohne und die HydroKirin HiTS-Serien-Wasserstoff-Brennstoffzellensysteme mit langer Flugdauer und hoher Energieeffizienz.',
      keywords: 'Wasserstoff-Brennstoffzellen-Drohnenprodukte,wasserstoffbetriebene UAVs,Industriedrohnen,HydroSky H100,HydroPhoenix H25,HydroKirin HiTS,Langstreckendrohne,Wasserstoff-Energiesystem'
    }
  },
  'scenarios': {
    'zh-CN': {
      title: '氢燃料电池无人机应用场景 | 巡检 | 救援 | 物流 | 清洁',
      description: '探索氢燃料电池无人机在工业巡检、应急救援、物流运输和清洁服务等领域的广泛应用场景，长时间续航使其成为各种专业应用的理想选择。',
      keywords: '氢燃料电池无人机应用,工业巡检无人机,应急救援无人机,物流运输无人机,清洁服务无人机,长时间续航,专业应用'
    },
    'en-US': {
      title: 'Hydrogen Fuel Cell Drone Applications | Inspection | Emergency | Logistics | Cleaning',
      description: 'Explore the wide range of hydrogen fuel cell drone applications in industrial inspection, emergency rescue, logistics transportation, and cleaning services. Long flight duration makes them ideal for various professional uses.',
      keywords: 'hydrogen fuel cell drone applications,industrial inspection drone,emergency rescue drone,logistics transportation drone,cleaning service drone,long flight duration,professional applications'
    },
    'fr-FR': {
      title: 'Applications de Drones à Hydrogène | Inspection | Urgence | Logistique | Nettoyage',
      description: 'Explorez la large gamme d\'applications de drones à pile à combustible à hydrogène dans l\'inspection industrielle, le sauvetage d\'urgence, le transport logistique et les services de nettoyage. Leur longue autonomie de vol en fait un choix idéal pour diverses utilisations professionnelles.',
      keywords: 'applications de drone à hydrogène,drone d\'inspection industrielle,drone de secours d\'urgence,drone de transport logistique,drone de service de nettoyage,longue autonomie de vol,applications professionnelles'
    },
    'ja-JP': {
      title: '水素燃料電池ドローンの応用 | 点検 | 緊急 | 物流 | 清掃',
      description: '産業点検、緊急救助、物流輸送、清掃サービスにおける水素燃料電池ドローンの幅広い応用をご覧ください。長時間飛行により、様々なプロフェッショナルな用途に最適です。',
      keywords: '水素燃料電池ドローン応用,産業点検ドローン,緊急救助ドローン,物流輸送ドローン,清掃サービスドローン,長時間飛行,プロフェッショナル応用'
    },
    'es-ES': {
      title: 'Aplicaciones de Drones de Hidrógeno | Inspección | Emergencia | Logística | Limpieza',
      description: 'Explore la amplia gama de aplicaciones de drones de celda de combustible de hidrógeno en inspección industrial, rescate de emergencia, transporte logístico y servicios de limpieza. Su larga duración de vuelo los hace ideales para diversos usos profesionales.',
      keywords: 'aplicaciones de drones de hidrógeno,dron de inspección industrial,dron de rescate de emergencia,dron de transporte logístico,dron de servicio de limpieza,larga duración de vuelo,aplicaciones profesionales'
    },
    'de-DE': {
      title: 'Wasserstoff-Brennstoffzellen-Drohnenanwendungen | Inspektion | Notfall | Logistik | Reinigung',
      description: 'Entdecken Sie die breite Palette von Wasserstoff-Brennstoffzellen-Drohnenanwendungen in der industriellen Inspektion, Notfallrettung, Logistiktransport und Reinigungsdiensten. Die lange Flugdauer macht sie ideal für verschiedene professionelle Anwendungen.',
      keywords: 'Wasserstoff-Brennstoffzellen-Drohnenanwendungen,industrielle Inspektionsdrohne,Notfallrettungsdrohne,Logistiktransportdrohne,Reinigungsdienstdrohne,lange Flugdauer,professionelle Anwendungen'
    }
  },
  'about': {
    'zh-CN': {
      title: '关于我们 | 氢燃料电池无人机领导者',
      description: '了解我们公司的故事、团队和愿景，作为氢燃料电池无人机技术的行业领导者，我们致力于推动清洁能源在航空领域的应用。',
      keywords: '氢燃料电池无人机公司,氢能技术团队,清洁能源,航空创新,绿色科技公司,可持续技术,无人机制造商'
    },
    'en-US': {
      title: 'About Us | Hydrogen Fuel Cell Drone Leaders',
      description: 'Learn about our company story, team and vision as industry leaders in hydrogen fuel cell drone technology, committed to advancing clean energy applications in aviation.',
      keywords: 'hydrogen fuel cell drone company,hydrogen energy team,clean energy,aviation innovation,green technology company,sustainable technology,drone manufacturer'
    },
    'fr-FR': {
      title: 'À Propos de Nous | Leaders des Drones à Pile à Combustible à Hydrogène',
      description: 'Découvrez l\'histoire, l\'équipe et la vision de notre entreprise en tant que leaders de l\'industrie dans la technologie des drones à pile à combustible à hydrogène, engagés à faire progresser les applications d\'énergie propre dans l\'aviation.',
      keywords: 'entreprise de drones à hydrogène,équipe d\'énergie hydrogène,énergie propre,innovation aéronautique,entreprise de technologie verte,technologie durable,fabricant de drones'
    },
    'ja-JP': {
      title: '私たちについて | 水素燃料電池ドローンのリーダー',
      description: '水素燃料電池ドローン技術の業界リーダーとして、当社の物語、チーム、そしてビジョンをご覧ください。私たちは航空分野におけるクリーンエネルギーアプリケーションの推進に取り組んでいます。',
      keywords: '水素燃料電池ドローン会社,水素エネルギーチーム,クリーンエネルギー,航空イノベーション,グリーンテクノロジー企業,持続可能な技術,ドローンメーカー'
    },
    'es-ES': {
      title: 'Sobre Nosotros | Líderes en Drones de Celda de Combustible de Hidrógeno',
      description: 'Conozca la historia, el equipo y la visión de nuestra empresa como líderes de la industria en tecnología de drones de celda de combustible de hidrógeno, comprometidos con el avance de las aplicaciones de energía limpia en la aviación.',
      keywords: 'empresa de drones de celda de combustible de hidrógeno,equipo de energía de hidrógeno,energía limpia,innovación en aviación,empresa de tecnología verde,tecnología sostenible,fabricante de drones'
    },
    'de-DE': {
      title: 'Über Uns | Führend bei Wasserstoff-Brennstoffzellen-Drohnen',
      description: 'Erfahren Sie mehr über die Geschichte, das Team und die Vision unseres Unternehmens als Branchenführer in der Wasserstoff-Brennstoffzellen-Drohnentechnologie, der sich für die Förderung von sauberen Energieanwendungen in der Luftfahrt einsetzt.',
      keywords: 'Wasserstoff-Brennstoffzellen-Drohnenunternehmen,Wasserstoffenergie-Team,saubere Energie,Luftfahrtinnovation,Umwelttechnologieunternehmen,nachhaltige Technologie,Drohnenhersteller'
    }
  },
  'contact': {
    'zh-CN': {
      title: '联系我们 | 氢燃料电池无人机解决方案',
      description: '与我们的氢燃料电池无人机专家团队联系，了解更多产品信息、技术支持或合作机会，我们随时为您提供专业支持。',
      keywords: '氢燃料电池无人机联系,技术支持,产品咨询,合作机会,氢能源无人机专家,客户服务'
    },
    'en-US': {
      title: 'Contact Us | Hydrogen Fuel Cell Drone Solutions',
      description: 'Connect with our hydrogen fuel cell drone expert team for product information, technical support, or partnership opportunities. We\'re always ready to provide professional assistance.',
      keywords: 'hydrogen fuel cell drone contact,technical support,product inquiry,partnership opportunities,hydrogen energy drone experts,customer service'
    },
    'fr-FR': {
      title: 'Contactez-Nous | Solutions de Drones à Pile à Combustible à Hydrogène',
      description: 'Connectez-vous avec notre équipe d\'experts en drones à pile à combustible à hydrogène pour des informations sur les produits, un support technique ou des opportunités de partenariat. Nous sommes toujours prêts à fournir une assistance professionnelle.',
      keywords: 'contact drone à hydrogène,support technique,demande de produit,opportunités de partenariat,experts en drones à énergie hydrogène,service client'
    },
    'ja-JP': {
      title: 'お問い合わせ | 水素燃料電池ドローンソリューション',
      description: '製品情報、技術サポート、またはパートナーシップの機会については、当社の水素燃料電池ドローン専門チームにお問い合わせください。私たちはいつでもプロフェッショナルなサポートを提供する準備ができています。',
      keywords: '水素燃料電池ドローンお問い合わせ,技術サポート,製品問い合わせ,パートナーシップ機会,水素エネルギードローン専門家,カスタマーサービス'
    },
    'es-ES': {
      title: 'Contáctenos | Soluciones de Drones de Celda de Combustible de Hidrógeno',
      description: 'Conéctese con nuestro equipo de expertos en drones de celda de combustible de hidrógeno para obtener información sobre productos, soporte técnico u oportunidades de asociación. Siempre estamos listos para brindar asistencia profesional.',
      keywords: 'contacto de dron de celda de combustible de hidrógeno,soporte técnico,consulta de producto,oportunidades de asociación,expertos en drones de energía de hidrógeno,servicio al cliente'
    },
    'de-DE': {
      title: 'Kontaktieren Sie Uns | Wasserstoff-Brennstoffzellen-Drohnenlösungen',
      description: 'Nehmen Sie Kontakt mit unserem Expertenteam für Wasserstoff-Brennstoffzellen-Drohnen auf, um Produktinformationen, technischen Support oder Partnerschaftsmöglichkeiten zu erhalten. Wir sind immer bereit, professionelle Unterstützung zu bieten.',
      keywords: 'Kontakt Wasserstoff-Brennstoffzellen-Drohne,technischer Support,Produktanfrage,Partnerschaftsmöglichkeiten,Wasserstoffenergie-Drohnenexperten,Kundendienst'
    }
  },
  'news': {
    'zh-CN': {
      title: '新闻中心 | 氢燃料电池无人机行业动态',
      description: '了解最新的氢燃料电池无人机行业动态、技术创新、产品发布和公司新闻，掌握氢能航空领域的前沿发展。',
      keywords: '氢燃料电池无人机新闻,氢能源技术动态,无人机行业新闻,技术创新,产品发布,公司新闻,氢能航空'
    },
    'en-US': {
      title: 'News Center | Hydrogen Fuel Cell Drone Industry Updates',
      description: 'Stay informed about the latest hydrogen fuel cell drone industry updates, technological innovations, product launches, and company news. Keep up with cutting-edge developments in hydrogen aviation.',
      keywords: 'hydrogen fuel cell drone news,hydrogen energy technology updates,drone industry news,technological innovations,product launches,company news,hydrogen aviation'
    },
    'fr-FR': {
      title: 'Centre d\'Actualités | Mises à Jour de l\'Industrie des Drones à Hydrogène',
      description: 'Restez informé des dernières mises à jour de l\'industrie des drones à pile à combustible à hydrogène, des innovations technologiques, des lancements de produits et des actualités de l\'entreprise. Suivez les développements de pointe dans l\'aviation à hydrogène.',
      keywords: 'actualités de drone à hydrogène,mises à jour de technologie d\'énergie hydrogène,actualités de l\'industrie des drones,innovations technologiques,lancements de produits,actualités de l\'entreprise,aviation à hydrogène'
    },
    'ja-JP': {
      title: 'ニュースセンター | 水素燃料電池ドローン業界アップデート',
      description: '水素燃料電池ドローン業界の最新アップデート、技術革新、製品発表、および企業ニュースについて常に情報を入手してください。水素航空分野の最先端の発展についていきましょう。',
      keywords: '水素燃料電池ドローンニュース,水素エネルギー技術アップデート,ドローン業界ニュース,技術革新,製品発表,企業ニュース,水素航空'
    },
    'es-ES': {
      title: 'Centro de Noticias | Actualizaciones de la Industria de Drones de Hidrógeno',
      description: 'Manténgase informado sobre las últimas actualizaciones de la industria de drones de celda de combustible de hidrógeno, innovaciones tecnológicas, lanzamientos de productos y noticias de la empresa. Manténgase al día con los desarrollos de vanguardia en aviación de hidrógeno.',
      keywords: 'noticias de drones de celda de combustible de hidrógeno,actualizaciones de tecnología de energía de hidrógeno,noticias de la industria de drones,innovaciones tecnológicas,lanzamientos de productos,noticias de la empresa,aviación de hidrógeno'
    },
    'de-DE': {
      title: 'Nachrichtenzentrum | Updates zur Wasserstoff-Brennstoffzellen-Drohnenindustrie',
      description: 'Bleiben Sie über die neuesten Updates der Wasserstoff-Brennstoffzellen-Drohnenindustrie, technologische Innovationen, Produkteinführungen und Unternehmensnachrichten informiert. Halten Sie mit den neuesten Entwicklungen in der Wasserstoffluftfahrt Schritt.',
      keywords: 'Wasserstoff-Brennstoffzellen-Drohnennachrichten,Wasserstoffenergie-Technologie-Updates,Drohnenindustrienachrichten,technologische Innovationen,Produkteinführungen,Unternehmensnachrichten,Wasserstoffluftfahrt'
    }
  }
});

// 根据当前路由和语言更新页面元数据
const updateMetaTags = () => {
  const path = route.path;
  let pageType = 'home';
  
  if (path === '/') {
    pageType = 'home';
  } else if (path.startsWith('/products')) {
    pageType = 'products';
  } else if (path.startsWith('/scenarios')) {
    pageType = 'scenarios';
  } else if (path.startsWith('/about')) {
    pageType = 'about';
  } else if (path.startsWith('/contact')) {
    pageType = 'contact';
  } else if (path.startsWith('/news')) {
    pageType = 'news';
  }
  
  // 获取当前语言，如果没有对应的语言数据，则使用zh-CN
  const currentLocale = locale.value;
  const localizedData = seoData.value[pageType][currentLocale] || seoData.value[pageType]['zh-CN'];
  
  // 更新文档标题
  document.title = localizedData.title;
  
  // 更新meta描述
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', localizedData.description);
  } else {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', localizedData.description);
    document.head.appendChild(metaDescription);
  }
  
  // 更新meta关键词
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', localizedData.keywords);
  } else {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', localizedData.keywords);
    document.head.appendChild(metaKeywords);
  }
  
  // 更新Open Graph标签
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', localizedData.title);
  }
  
  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', localizedData.description);
  }
  
  // 更新语言标签
  let htmlElement = document.querySelector('html');
  if (htmlElement) {
    htmlElement.setAttribute('lang', currentLocale);
  }
};

// 监听路由和语言变化
watch(() => [route.path, locale.value], () => {
  updateMetaTags();
}, { immediate: true });
</script>

<template>
  <!-- 这是一个无渲染组件，只负责管理SEO元数据 -->
</template> 