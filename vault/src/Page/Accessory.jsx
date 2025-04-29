import React, { useState } from 'react';
import { Shield, Car, PenTool as Tool, Battery, Disc, Sparkles, Radio, Wifi, Camera, Umbrella, IndianRupee, Star, ShoppingCart, Heart, Info } from 'lucide-react';
import "../assets/Accessory.css";

const Accessory = ({ carType, carModel }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Accessories', icon: <Car size={20} /> },
    { id: 'protection', name: 'Protection', icon: <Shield size={20} /> },
    { id: 'performance', name: 'Performance', icon: <Tool size={20} /> },
    { id: 'electronics', name: 'Electronics', icon: <Battery size={20} /> },
    { id: 'interior', name: 'Interior', icon: <Sparkles size={20} /> },
    { id: 'exterior', name: 'Exterior', icon: <Disc size={20} /> }
  ];

  const accessories = [
    {
      id: 1,
      name: "Premium Floor Mats",
      category: "interior",
      price: 129.99,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1558430542-ca4583b9299c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "All-weather, custom-fit floor mats with anti-slip technology",
      features: ["Waterproof", "Easy to clean", "Perfect fit", "Durable material"],
      compatibility: ["All Models"]
    },
    {
      id: 2,
      name: "Dash Camera Pro",
      category: "electronics",
      price: 199.99,
      rating: 4.7,
      reviews: 243,
      image: "https://images.unsplash.com/photo-1677456868094-5da64833186f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "4K resolution dash cam with night vision and parking mode",
      features: ["4K Recording", "Night Vision", "GPS Tracking", "Mobile App"],
      compatibility: ["All Models"]
    },
    {
      id: 3,
      name: "Body Side Moldings",
      category: "protection",
      price: 89.99,
      rating: 4.5,
      reviews: 98,
      image: "https://api.hyundaimobisin.com/service/asset/accessory/928-K6S33AP001-BODY-SIDE-MOULDING-CHROME-Spark-Green-with-Phantom-Black-Roof-720X400.jpg",
      description: "Color-matched side moldings to protect against door dings",
      features: ["Paint matched", "Easy installation", "Door protection", "UV resistant"],
      compatibility: ["Specific to car model"]
    },
    {
      id: 4,
      name: "Premium Roof Rack",
      category: "exterior",
      price: 299.99,
      rating: 4.9,
      reviews: 175,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs0AuMuJxOp3GfqZzw-NxQz15yG231rLj-8Q&s",
      description: "Aerodynamic roof rack system with quick-mount technology",
      features: ["Aerodynamic design", "Tool-free install", "High capacity", "Universal fit"],
      compatibility: ["SUV Models"]
    },
    {
      id: 5,
      name: "Performance Air Filter",
      category: "performance",
      price: 49.99,
      rating: 4.6,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1587121892719-1711ec9cc798?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "High-flow air filter for improved engine performance",
      features: ["Increased airflow", "Reusable", "Easy installation", "Better fuel efficiency"],
      compatibility: ["Specific to engine type"]
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      category: "electronics",
      price: 79.99,
      rating: 4.4,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1698314440055-5aa837af0a7f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Fast wireless charging pad with anti-slip surface",
      features: ["Fast charging", "Anti-slip surface", "LED indicator", "Universal compatibility"],
      compatibility: ["All Models"]
    },
    {
      id: 7,
      name: "LED Light Bar",
      category: "exterior",
      price: 159.99,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1621696306273-542abbd50d55?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "High-intensity LED light bar for improved visibility",
      features: ["High brightness", "Weather resistant", "Easy mounting", "Low power consumption"],
      compatibility: ["SUV Models", "Truck Models"]
    },
    {
      id: 8,
      name: "Car Cover",
      category: "exterior",
      price: 69.99,
      rating: 4.3,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1642270211149-c3b2781a9e5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Collapsible cargo organizer for trunk space",
      features: ["Collapsible design", "Multiple compartments", "Durable material", "Easy to clean"],
      compatibility: ["All Models"]
    },
    {
      id: 9,
      name: "Paint Protection Film",
      category: "protection",
      price: 399.99,
      rating: 4.8,
      reviews: 156,
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExMVFhUWFhcWFxcXFxcXGBcXFRUWGBUXGBYYHSggGBolHRUWITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dHR4tLS0tLS0tLS0tLS0tKy0tKy0tLS0tLS0tLS0tLSstLS0tLS0tLSstLS0tLS0tLS0tLf/AABEIAKgBKwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EAEEQAAEDAgQDBQYEAwcDBQAAAAEAAhEDIQQSMUEFUWEGE3GBkSIyobHB8EJS0eEUI2IHFTRygpLxM0OiFhdTssL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAjEQEBAAIBBAIDAQEAAAAAAAAAAQIRAxIhMUETUQQycWEi/9oADAMBAAIRAxEAPwDzOjhXOBd+Eau2Hn9FM2uG2ptvPvESfJug+JXY/Fh7oaC2m2zW8h15nqoXPI0Pp11vzUO8riZlxk6m8nzSF/2FHKUINKx0XBMq+4VxqtoSHCQLn2t9I10/dZ2U4OQnKSxuKHF2vtmuNQiWY0jSFgXVja+lh0VhguI1RqMw+Pqmwy49eG1HFubfQx85QlXGnaW+Ej1VOzFE6gjxj6J3fJ7Z9KwNZRuObZCd6UjnTqkehZaAPfjneflonB1IXJc7oAAP9x/QqtmI5JTYoNajioaIp0aY/qfLz6DK31CtuznEalR5a509A1rWiOTWgAeizCuOx1UDEtB3a4DxifkCp5P1quOf9Rtg2FG4XRFRt01efp6UVuMCz/Exa11f416oeIH5hXh5Z8nfGs23BOcdICOw/Bm738UcK7G6X8B/+tEx9eodBlHP9z9Au95qTuadNsugD0CbSx+cxTY7L+aMrfKbnyC6lhW6u9o9b/NENQSOph8xuUTwvDNa4mNBOnl9UFi+J0qQ9p0nkLlVTO02WoDlysNjuSDv9UspuVXH2ylq44i8TIE7Qq+pQjxTjxJhdma4EHeVC7GtdofRc+q6ctbDVWE7KLEAo3vgbJhaLqiVrWkfIdOqf3YjqiXssm5IQWkHdnQaJ4pRqpgLJrmpDSOeSSq5SRCjLEyIxg81G4tnVONkK6lKCVoauXBKtm1pEq5c0SQEJtT4fDF3Qc0SMG0bk/BEtbAgKMG5+9kMbnadTotGgCnDlGFzgmlJ3uykaoRTlTtQDwnBMCVAJVFkrjIBSlJSaYj08EAodZaLsTw3PUNd05adm9XkfIA/EKowmFZM1HENGuUS49BNh4n4r0TBU2UqbabBDQNJk3uZO5us+XLU/rbhw6sv4neVATIT3GFFS0XG7p5B4hllnsdT1C0tRuqosULp4llOyup0wL6nr+imc9UvGeMOoQA2ZmD4HT5LK4zjtd8jOQDsLLux7x5lx7t9isbSp/8AUqBp/KPbeemQaH/OWjqqfHdop9mlTyj8z4e4/wCn3G+EOPVYmhXcHAkmJ+CunBUnSUVC9xc4lxiZJk+pQ9Q6qSk6D00SvonUXCDDgp9KoWmyTKuTAs4wzoiKWOneOhVamkqbhKcysXjMRNtT0RlfDPphpe3LmEgH3o2JGwPVVtFlKm5hzOkgSXAZWu3AA1jmr4YVxdBcI1zFwLQ3XNmNo1Tx4pfJZc9iqr1wxuZ0gaTHPRAu41SiRJ8lP2i4pTqgUKM9wz8REOquvNRw2FyGg6DqSsx3RBc3pI8k8uCQTmtWx4+CYaz1P6ILE8aqHSB4IClZwTH6pTCT0fVamdj6h/GVEcW/8zvVNa2SBIEmJOgT3YF/2D+ieoFglSBKodBFPg2S4dLqAlG4EQJ3KEZXsNcVBT5805ztlwTZJGlOBUYTwUBIwqQKJqkBQaQJwTGlPQSRlOdUSwAIRtRONfogC80kBegBeYOxcfovRaWLbUaHMIINwsOb06fxvYmq5OBsoM66pVsud1xBWOqqa7UfVqXKEqugE9CnIWTHdp8MX0XEasOceA974fJYYlei4ysAxxOgaZ9DK83abLs4vDi5Z3OVpw/EZhlOo+Sq06m8gyDC0ZL2EtN5BsgqGPaRDrH4I2Yvv8kklxQAKhJSVH7kob+IBMNuen6phOXTopKdYMOntc+XQdVBhMSM2XSbTOx5fqiP4YsmYt+IkABVr2i30Pw7xBz66ido3VdjeOl38lpPdz7R0zHYnoOSrMdxJz/ZBOQW8f26IMpyiYrprktjdUzK7hYFTMxrt4PwWvXLNVPRZ4PrNgqKvqUQ6sH+I2UFUb+SxrSGUQ0yHGDFuU9en6qcVarfZBMC1hI8jCDR1PHPAAlIxppuBgiCmo15BPtSR0MQoq9Bua2bzUNJkHaJMI3NA+SjZSymSZ8lM1BW7OphSBIE4IIoKcmhLCAeHJwKiafuFJB6IB8pcyYJ3TXOQEuYqMvndNY2QZm+nQ9bXXNZCYQ1wfJWfZviT6T8oPsuIBB0B2KAqqGmlZuaPG2XcemUce0tJnePAqcVwVScHyvwzJP5ieZOY/oEVTqEtz5comB1jdcdnfT0cbuSisVqqPimOgRP7ojGYxxMAHl4qg4hh6oqBz4LbRG3OevwVY4jkym5IG7QuLcK87nKD4FwBWGC3/GcO6rQe1upEgbnKQ6PhCynCuzmKxHuUiG/nf7DfIn3v9IK6OLw4+ftkrJXSlr0SxxY7Vpg+I1TAtGJyka8hRKSlTLugAkk6AcygH0mOecrRJufAC5JOwRIyhpa3U6u/PpAHJuvimVXRLGiBN5EF0aSNh0+aY10eaaLdmjYyBcTuYm8Dy6IrjOPD6bGAzDnEnctEBkjrcoTHjIchAmxkOBEG4iLFBoGiJcyQpEGVdKRKmDmOIMhGTI8fgQgQrfC4MDDurPMZnAUxzg+19fRFFVrhddKkqsUcID0ftH2SqYc5g5lWkfdq0nBzTymPdPj8Vm3USNVFRxJYTMgrSdk6uDrB1LFvqU3GDTqtGeObXs1cNCCL6rNXhQFpOqlaFqsf2SDR3lLF4SrT5isxp8Cx5seioHUBMZgfC/yQSABPDUVQ4JWqXZSqPjk1x+QUlbgGIZ7TsPWaP6qbx8wgwXsjUpH1RsQmmmSbjr8fqmvp62QE9PxTy5BOZF5XNqIA2UgMRzn906k4CC0kGDN9ZkHa1jCQC/w/VANJSynQmSEBC9kkSmloDlLfN5I/hHCXYl8TlYPefyHIc3G6LdTueONt1DuyNKvWqvA/wAOw+3I1Me608zaeQ8QtbxDiGWwEDYLn1qWHpCjTblaPiTqSdyVnsQDVdJeWjk27j0vZo8iub98tu3fxY6WQdlBqPIBPMwGjxOiDGCfUdm94EktkFoA0i4LniN2gi8ovDUGj2zlYG/9ys7Twm48svgkxna/h9EAMZUxtU7H+RhweojNU8wQea1xw05s+TaLBcKrOdkZFQzfLMN6uJs0dSR4IriVXC4YRjMVLgP+hROZ3QOj6rJcd7b4/EtLQ9tCiCW91h292waA3HtHXms7XwGV7WakgG25JMeeiqYJy5LlNUnE8j6r6rWuYx5e5jTEgbAwTeShBhXEAgGCNdBYxcmwVrxKlDmgWgR5Ax9E2ph3OIFzAgan0WjLavOFA9548Ggu+Nh8UuJrNIDGNLWi9zJcebot4BXdHgzyPagDrqi8N2Xe7TKL72Oyadso5phGMeGtgsLnRIG19CTy++q2WF7H6ZqhB1GVo+bp+Snd2aw4kuaXf5nEj/aIaPRA285qUnOJc4tE83NHkBNhson0SL2I5ggj4L0tnD6bfdpsHg0ILG8Jov8AeptnmBlPqIQOp54uVpjsA1j3Ma7MBvuJBgE7m23NVaFeSJVy5AEYDCmrUbTGrjHgNz5BHdoMTmeKTPcpDI0Dc2k/TyR3Z+h3VJ1Yi7wWt6N3PmYHoouz2GFbEZz7rTnM7mfZHr8lNvv6Cfi/AXUqLHiT7IFTo7n4beSz+Vep1HSCCJBEEHcHVZet2QJcS2qA2bAtJIHKZupxz+wbUh3vCfH7+SdgcJSbVYXnNTcQHCXDICQCZtMCSL8pXMFk51NUndVznZHnYgkAESQPNKMWZs71B/RWjpLCx0lp00kRe07aIOrhmBrQ0GZOdxtyiGzFroVMhWG4jiGtzMrPaJiWve2/LWFb4btpjqYynEVjtd5d4yHkj4KmxBaWCmPdDgZ2PkYvdH8OrUHPdTrz3dWxcACWOgBrhcbgeRQfVF9Q/tCLmluJpUKzbNGemGPiNnsFv9q59fg2IvNbCPPI9/TGvg9ZFvDC2o5rXBxFmi4c6bcuSI/9P1z7lFzjybmJHiIQNxosT2PFQD+ExeGr5jYd4Kb4H9L4v5oLF9jcdSjNhqkDcNzDfdk9VSO4Pimm+HrCP6H/AECNwXF8RhrAvpwZ95zCDETYi6FBK1BzJDgQRsbH0KY0uAV//wC4GJAyuqktm4cGvBnWc7Tqld26Y738Ph39TQpfNgagbUPeFc145K8PavCPgOwNI/5O8Z8qsfBSUsbw6of8JWH+Wvp5Opu+aBtnWvEk+S0/Z3jTGYfJGUgnMQCc8wZkTe4Hko28Ho18ww4NMtE5Krs737nLlAE/0m52lB4DAySxtVzCbOFmtN7ZrEwPqpyxmU1Tx5ei7hnEeMMBOYxyBuXf6RcIatxGvle5jMjWO7txdYtJmJpjQSIk7wpP7qLHvpkAPHnm3nN+KRcGbozAVc9VwqXFcBtT/OBDX+JvJ5uJTmMnhOXJc7uqXG4N9SjTrue5weHNNxDHtJgACwBAB8Z6KMUmupOewAGGVG9CPZqN+ZWp7PcBqh1bCVRDHEmm47P1aQORt6RupuGdlwzMx5J1EaAcwmjbHjB56TyLkumNSJIt8FZU+EVH1aT4AhrRcDrqIvrutpg+EsY0ta0BE08IJbbRGwyNTgDc4zSYH1J+qOp4Frdo8Ar+thvaSfww3SCno4CfaI8ArClhoEKTEYhjDc6bDVZzF8dr1XRhqZLAQC47nlO0pyE0mXZCYgCY1PIfdkKeNHD0+8xeVhI9lgOao47Q3l1MKhxPbej3f8ik7Odc8QOpgy7wsqhLPiddlJueq4NGw3J5Aak+Cw3Ge0L6stZLGf8Ak4dTsOgTO5r4uoXElx3cdGjkNgOgRGPw1KgO6HtPLZe78rdh0n5DqgKLPAA0Mz8LffVQlPrPkyNExC4aieH4Q1ajWDc3PIDU+iHV9wmiadPMPfqnK3o3n5/oi0xnG8QBRyM0JDGAbgWt5/JXXBOHChSDCPaN3eJ28ALIDh+Fa6oHu9ymIZyLo97yHxPRXblhlfRJGUtxIHT9E6Tz+H7p9PRP7tQGTc2B05pzSg8NxBo3lp1F5jmNka+mIzNcHNOhB+fJbo0cHBsyJO3RdUIMRuoHp4boUBa8J4cys7ISG9dz9x8VdV+xoOjx6/ssxg8U5jrfd1tcJx6mQAXQd0yBO7J1Scwc0nqeStadLiDaTqOYOY6JGaNOouiqPEWGwqCfFQOxWJBsGvGxB28OaQV390VRo2qDyFYuHplU1LhuKH48RPk4ejnj5Kzp8UrD3qR8pPyRFPtEdCxBq2jwSoTLwXDU5sNSJPmHfVScT4C17Q2lg3B34nzlBvqGZjHhKuGdpWjVhHr+imZ2tp8vimGGb2Cxzj7NIR1IV5w/sHjWj2mtuPzArU0O11LkfVWWF7UMP/KCYPF9hMROYHKRpEplXsnUe/vHvaH/AIiB7x/NHM7r1jDY1lUfh9QVDjeGg3YL8pQbzin2YpiMxc4j3SbRvlttyRrOFMbJDQCdbbq2xtRzNWDrLtPgq9/ECbTSHi/UbmEjSYnC5g1495tj9D980zF087u8iCYJjnFz5m/mgn8Zc0wXUoNrSfqqnE8bqSW95HKGj6pHtfdyhqlemwjM9o6Tf0WXxOMqVLDvH9JhH8O4M4w5+RgHRz3enst+KDPxvHWDN3bXOI3iB+qzlTjdeq/K2covYRPITy0WhxdCiyQ+oSPy2HqG6LO8Q46yk09zTgbGLk7ffinCWuC4O2xxNQgPtkZ7z5/BmN77wDbzVlx/tBhuH4cNotaysZDGtAJptIu5sz7Z0zO0Gmy8yq8SrlpxOY94w5S51y0HQsmzb20sqhjXVpOZzolz3uJJ5kuJVwg+Kxb6r3Oc4uJMkuOYnxJWs7K9m6Nej3jnvzh3tNAgZZcGw6bk5TsNVk8PQNR4Yz8R1OgG5PQC69k4RRp4bCB9QNptawSYglrRDXPv7x1gRd0RKLQz/GK1PCUZDQBoxotLvu5K8/x9Zxu7V3tHmfHl4eHJWHHOKuxlYvh2UWpsFy1s7gavd92CjwXZjGVrsw745u9gf+cJWyeTxxUyc1pOgW5wH9m1Z161Wmzo0OefWwHxWhwf9n+EYPbNSp0Lso9GQs7zYxrOPKvMOG4LvagZPUxsBr99VpKeEq1Xk06NTK0ZGeyQL2kHTSfgvScFwihRH8qjTZ1a0AnxOpRRassuf6ivhZLC8JqhobkiBFyEQ3gbt3NHhK0LgkhY/JVziiop8LjVxPkAuOBHMqzcUwlHVV/HPp4mHKWjXLSHt1HxG4KSoAdPQ/r96bpK9INiHTIkyIg8rTM813OJeYfFtqiBZ3L9OakptOizbHZfor3hGO7z2XuBdsTALpNh1KV7FoTVcNgp2AwhqtjC0nZyg6pDGMzOcYFp0HwCNgNg8FU8Os+B1BRrw5n45PQrQ8S4e5og2jWyzWNpVL5RtZLYJV4o9hjvXA+JTv77rR74d5AqjOFdqRfVEYQbXEgzpGkghA0v6XaiplsG5hsRIPOORTD2yeNaNI+SpSwG4sVHXpyJiDv+qey00tHtoz8WHp+SsMP2pou0w4no4j6LAOYpKNdzCHAmx06Jh6ceNNY3OcM+OYej+D9tKT3BgD2uOgNSxOwmYXnWJ7RVXtFMNAbNid0DVJAzGZlIPY8T2swbwDVpvEywzNnD3muGzgqPF8Z4aXCKeYwY/mOB0M2WTw/Gw6jFYAlzcjre0Ynu3k/mbMTyJCy2Iquo1Q439qQdJjTwT0HpDO0OAcwubQaIdEEuOu+lhKrOJ9qBTjJhqPiRPpp1WZxGIpATTNnXg6tJ1HUdUKOItqENOml7idktBpD2ucTlJyA6FoaNdNVLUwjq7XEVnkxOUusVjuJYWoHNpZHZswhsGTPtCy1PC+BYkCXVAydQLkDcTp81NsnlpjhcvCkpYV7MxqEC5tz8FDVbUqnu6THO5wCfjsAt1g+z9JhzOl7ub7geA0Vs2kByWd5pPDafj33WCwnY55YWVHBrXluYA+0GtMwLQCdJvuUZxvsq6uG0qTqdCiAAWtZLnBs5QTIkCZvNzJkrYloTSs/nyX8GLJ8F7EUaBzFznutJMAQDMQNpi07LSYvAtqjLVa17ZnK4AiRpY2KnzJpd1UXlv2ucWMMpYVlMQxrWj+loHyUuZREpvgs7nVzCRMagS5lAEuZLqp6iQuUbilJTHI2NFJKaHFdKQwgaI4qMlOcoyVRvF2VI1vy1nxlSd6CLwfKD5lt/NQOCavSedpLUANx6WPoVDl8koCKo4YmC4+AQWl1wzEGqyXe1Ub73NzREP66wfInVW/B+MPw7s9N2UwsdnIdmBIg2ItHgUZ/Gvf773O8ST80tDT0wf2h5v8TQBA/G36k2VhQxuBxLP5VUU3G2Wp7F+jvdPkV5NTxjmaO8tj5IrB4inMy6kdzT90+LYj4FLQ09Hx/A6rf+2S2PeAkeoVO/AhrtIg3HzVVwrjmKw5/k1iWb9246czTuD/tCuW9r3OM12NedC4ANPWYEH0CNECPDLAgxayaMI7QiVf4Xi+Be0NdnZygafqiW4Cg7/p1wZ5wD6WRomSdgvJMZw4udDS0kiIJ+XVa6tweoBYByrKmDe0gupXG+X6hBKTD4IwRUJAF2wRqVBjaoMNF49FeYnhYyuMH/AEl1/IoXhfC6eYOfZjRMSJd0H/CAzVfNrJ69QubiQRkqDM3YjUFaLiFdj3yKYF7CIHhFk/E8Mpvy6tIECI/T6p7Nmm4b8pB84Un8M4at9FYO4AJs/wBR+6L4ZwJ7ntaXWmXETpv5pW6Em7qNXwag51Om+qAagZlDiPaDNWtJ3j9tlahiRgDRZcXrjuW7uvSxxmM1COKgfUhI96HrOELNokdUTRWVTiMaRN9FVu480GJTmNqLnjGqdVSiqs2zjAO6LZxEcwlcaXXFu+soxV6qr/jQVMzEjmlobWDKqeKir3YgQuGIlLR7GmqE3MghWC44hA2OzhMJEoX+ITf4gJ6GxLqiZKFOJlN7zqq0W3nLqImHDp0ny1Qz6DJgEj78FIcO5pOXT72UZJ5D0XoOFzWAaQeqbUrHQG/Nc5pOp9FzaYQEZtZTNafBOZA2T3OlMbIyluSnMeW9VwcuCRHisCeR9FaU6hIGhtN/iqctCmw1XLa8a21Hh+iAvGkcvQpaNYzIcR4oHOHC2h0Ol/1TW1Tp9+aRL1vFKzfcqEeDoPzRVPtVimj2nZgB+MB0+BI+uyy1ckgjdH0KRGFNQGC5zQPAEz8YTLTQU+1znRmpt8QCPrCM/wDUOHkOfRIdMkz/AMLFNru3g+IHzSmuN2+hP1QNPUK/EuHYlned0AG2eGMDX0j+aWySw8yCAbWsq19HAm7MURyzj6wsLhsWabg+m57HjRwPw6jorpjqeMIcAGVRAqtaA0Ob/wDKxosOTgNLHSYVkGl2OHNqGaVVrhJki4HTqrLum0mw3XcncoRhbQaA0Q0WEKs4vx5rBa55C5nZcmWWWV/x348Uwm11TxRJvoNUcaghZbg2ENX26pJk2YdBodDvor7EBzRYffgovlVuivegMbVSUA5rTIi+nJV/FsUKdNzzsP8Ageqcx76Lq7brK9p+MEP7pmou48jsFnwTMkmTqlu4lx1JJPiblSALsxxmM04sst3ZmIxL2gAOIJUTOJ1R+M/BQ4t0u8LJlCkXODRv8t1WoS/4dxCqWyT4dVZUeJOBAOuvl9wq45WMnRrR8lDXrEUpNn1dB+Vg2++azuEvo+qxe0eOsP4lZUseDoVg6NKRHMhvqb/AE+S13DmiC4j3jI8Nv181GfFJ4VOWrNuKSmsg3U4OllEdYCy6F/Kse+Sd8UHVIiB7xMAcyUY3CtETf73R0H8sML0nelZLjPFqgrPaxxa0GAPAX+MoD+9Kv5z6lazgui+VoX0g9ocNxNrgqsr4dcuVztWIQhNhKuWhECVcuTMkpZXLkBG+UjcQVy5CoIoYzKdDBiROvgdj1VvTqU6s5S0bAxHgHDY9d7rlyVhWG02xLHC40/ZEDDvNM5T7LbkfVKuUXskIKbvRNe1w/DrokXJ7BknknUar2uDmyHC4I2XLk9gZW7SZnsD5a24qZdB/U3cdR6HYbXB4anAe0AiBBG87rlyw5sZJLHb+NlbdUdTpgSdjB89/oixiARquXLnjozivxjxErA9rOJB7hSabAy6Oew+q5ct+Gbrl57qaUTQke+GkpVy6HIrCrXh2HhsnV3ySLk8vBpap7yoKf4Ge0/kY28P35IfE1DVqSASSQGgfAAdeXVcuTkTRrMMWvFORIMEjTMbWPRub1WloOEQuXLPkESALm0w641+aVcslG0qYc95Ng30zEa+Q/wDsiqjg1mYmGxJJsQBc/BcuT0HnGKq53vd+ZxPqTChXLl1B/9k=",
      description: "Self-healing paint protection film for vehicle exterior",
      features: ["Self-healing", "UV protection", "Invisible protection", "Easy maintenance"],
      compatibility: ["All Models"]
    },
    {
      id: 10,
      name: "Garbage can",
      category: "performance Exhaust System",
      price: 499.99,
      rating: 4.9,
      reviews: 178,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNx4eBj6bt6HQB4bVEiFRcEKK8UhPYvw6gO_zRZSKw_lK7cORRq4qSBAOI6KzEomed388&usqp=CAU",
      description: "High-performance exhaust system for enhanced sound and power",
      features: ["Improved horsepower", "Deep exhaust note", "Stainless steel", "Easy installation"],
      compatibility: ["Specific to car model"]
    }
  ];

  const filteredAccessories = selectedCategory === 'all' 
    ? accessories 
    : accessories.filter(item => item.category === selectedCategory);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? 'filled' : ''}
      />
    ));
  };

  return (
    <div className="accessories-container">
      <div className="accessories-header">
        <h2>Recommended Accessories</h2>
        <p>Enhance your vehicle with our premium selection of accessories</p>
      </div>

      <div className="categories-scroll">
        <div className="categories-list">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="accessories-grid">
        {filteredAccessories.map(accessory => (
          <div key={accessory.id} className="accessory-card">
            <div className="accessory-image">
              <img src={accessory.image} alt={accessory.name} />
              <button className="favorite-button">
                <Heart size={20} />
              </button>
            </div>

            <div className="accessory-content">
              <h3>{accessory.name}</h3>
              
              <div className="accessory-rating">
                <div className="stars">
                  {renderStars(accessory.rating)}
                </div>
                <span>({accessory.reviews})</span>
              </div>

              <p className="accessory-description">{accessory.description}</p>

              <div className="features-list">
                {accessory.features.map((feature, index) => (
                  <div key={index} className="feature-tag">
                    <Shield size={14} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="compatibility-info">
                <Info size={16} />
                <span>Compatible with: {accessory.compatibility.join(', ')}</span>
              </div>

              <div className="accessory-footer">
                <div className="price">
                  <IndianRupee size={18} />
                  <span>{accessory.price}</span>
                </div>

                <button className="add-to-cart">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessory;