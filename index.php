<?php
// tambahan
    include './conf/conn.php';
    $sql = "SELECT id_daftar, Nama, NIK ,Alamat, Jenis_Bayar, Poli_tujuan, KartuAsuransi, KartuRSPI, KTP, is_verified as status_pasien,  date(insert_at) as tanggal, time(insert_at) as waktu ,insert_at, date(curdate()+1) as tanggal_layanan, no_wa FROM `daftar_pasien` having tanggal = (SELECT curdate()) or tanggal = (SELECT curdate()+1) ORDER BY insert_at asc;";
    // $sql = "SELECT * FROM daftar_pasien";
    $_SESSION['data_pendaftar'] = sqlFetch(dbcon()->query($sql));
    $dp =  $_SESSION['data_pendaftar'];
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>PI-Care Dashboard</title>

    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <!-- tambahan -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon">
                    <i class="fas fa-hospital"></i>
                </div>
                <div class="sidebar-brand-text mx-3">PI-Care</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#modal_data_pasien" id="cek_pasien_lama" href="#">
                    <i class="fas fa-fw fa-list-alt"></i>
                    <span>Cek Pasien Lama</span></a>
            </li>
            

        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Search -->
                    <!-- <form
                        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form> -->

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">Tabel Data Pendaftar</h1>
                    <!-- <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                        For more information about DataTables, please visit the <a target="_blank"
                            href="https://datatables.net">official DataTables documentation</a>.</p> -->

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <div class="d-flex">
                                <div class="mr-auto p-2"><h6 class="font-weight-bold text-primary justify-content-start">Data Pendaftaran</h6></div>
                                <div class="p-2">
                                    <input type="date" class="form-control" id="filter_tgl" placeholder="cari tanggal layanan">
                                </div>
                            </div>
                                <!-- <h6 class="m-0 font-weight-bold text-primary justify-content-start">Data Pendaftaran</h6>
                                <h6 class="m-0 font-weight-bold text-primary justify-content-end">Data Pendaftaran</h6> -->
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Jenis Bayar</th>
                                            <th>Poli Tujuan</th>
                                            <th>Dokter Tujuan</th>
                                            <th>Jam Daftar</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        // ekopre($data);
                                        $i=1;
                                        foreach ($dp as $data) {
                                        ?>
                                            <tr>
                                                <td><?=$i++?></td>
                                                <td><?=$data['Nama']?></td>
                                                <td><?=$data['Jenis_Bayar']?></td>
                                                <td><?=explode('_',$data['Poli_tujuan'])[0]?></td>
                                                <td><?=explode('_',$data['Poli_tujuan'])[1]?></td>
                                                <td><?=$data['waktu']?></td>
                                                <!-- tambahan -->
                                                <td><?php
                                                if($data['status_pasien']==0){  
                                                    echo "<span class='badge badge-danger'>Belum Verifikasi</span>";
                                                }else if($data['status_pasien']==2){
                                                    echo "<span class='badge badge-success'>Terverifikasi</span>";
                                                }
                                                ?></td>
                                                <td>
                                                    <div class="dropdown mb-4">
                                                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Aksi
                                                        </button>
                                                        <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton" style="">
                                                            <button class="dropdown-item text-info detail" data-id="<?=$data['id_daftar']?>" data-toggle="modal" data-target="#modalDetail">Detail</button>
                                                            <button class="dropdown-item text-info setBookingBaru" data-nama="<?=$data['Nama']?>" data-id="<?=$data['id_daftar']?>"  data-tanggal="<?=$data['tanggal_layanan']?>" data-no="<?=$data['no_wa']?>" data-toggle="modal" data-target="#modalBookingBaru" >Booking Pasien Baru</button>
                                                            <button class="dropdown-item text-info setBookingLama" data-nama="<?=$data['Nama']?>" data-id="<?=$data['id_daftar']?>"  data-tanggal="<?=$data['tanggal_layanan']?>" data-no="<?=$data['no_wa']?>" data-toggle="modal" data-target="#modalBookingLama" >Booking Pasien Lama</button>
                                                            <button class="dropdown-item text-primary lampiran" data-id="<?=$data['id_daftar']?>" data-toggle="modal" data-target="#modalLampiran">Lampiran</button>
                                                            <button class="dropdown-item text-success setVerifikasi" data-poli="<?=$data['Poli_tujuan']?>" data-jenis="<?=$data['Jenis_Bayar']?>" data-id="<?=$data['id_daftar']?>" data-nama="<?=$data['Nama']?>" data-tanggal="<?=$data['tanggal_layanan']?>"  data-no="<?=$data['no_wa']?>"  data-toggle="modal" data-target="#modalVerifikasi">Verifikasi Pendaftaran</button>
                                                            <button class="dropdown-item text-warning setBatal" data-poli="<?=$data['Poli_tujuan']?>" data-jenis="<?=$data['Jenis_Bayar']?>" data-id="<?=$data['id_daftar']?>" data-nama="<?=$data['Nama']?>" data-tanggal="<?=$data['tanggal_layanan']?>"  data-no="<?=$data['no_wa']?>" data-toggle="modal" data-target="#modalBatal">Tolak Pendaftaran</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php
                                            }
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Unit IT RS Pelita Insani 2023</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        <!-- Modal Detail-->
        <div class="modal fade bd-example-modal-lg" id="modalDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Detail Data Pasien</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Nama</label>
                                <input type="email" class="form-control" disabled id="nama_pasien">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">NIK</label>
                                <input type="email" class="form-control" disabled id="NIK_pasien">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Poli Tujuan</label>
                                <input type="email" class="form-control" disabled id="Poli_tujuan_pasien">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Dokter Tujuan</label>
                                <input type="text" class="form-control" disabled id="Dokter_tujuan_pasien">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Jenis Bayar</label>
                                <input type="text" class="form-control" disabled id="Jenis_bayar_pasien">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Ibu Kandung</label>
                                <input type="text" class="form-control" disabled id="nm_ibuk">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Penanggung Jawab</label>
                                <input type="text" class="form-control" disabled id="nm_pj">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">No.Telp Penanggung Jawab</label>
                                <input type="text" class="form-control" disabled id="no_pj">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Alamat</label>
                        <textarea class="form-control" id="alamat_pasien" disabled rows="3"></textarea>
                    </div>
                </form>
                <!-- <table class="table table-responsive table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Nama</th>
                                <th scope="col">NIK</th>
                                <th scope="col">Jenis Bayar</th>
                                <th scope="col">Poli Tujuan</th>
                                <th scope="col">Alamat</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                        </table> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        
        <!-- Modal Lampiran-->
        <div class="modal fade bd-example-modal-lg" id="modalLampiran" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Dokumen Lampiran</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                                            
                <!-- carousel -->
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner" id="carousel-lampiran">
                        </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="fas fa-chevron-circle-left" style="color:black" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="fas fa-chevron-circle-right" style="color:black" aria-hidden="true"><i class=""></i></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <!-- modalVerifikasi -->
        <div class="modal fade bd-example-modal-lg" id="modalVerifikasi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Form Verifikasi Daftar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Nama Pasien</label>
                                <input type="text" disabled class="form-control" id="Nama_pendaftar">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Poli Tujuan</label>
                                <input type="text" disabled class="form-control" id="poli_tujuan">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">No. RM</label>
                                <input type="number" class="form-control" id="no_rm">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Tanggal Layanan</label>
                                <input type="date" disabled class="form-control" id="tanggal_layanan">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Jenis Bayar</label>
                                <input type="text" disabled class="form-control" id="data-jenis">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">No Antrian</label>
                                <input type="number" class="form-control" id="no_antrian">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Jam Layanan</label>
                                <input type="time" class="form-control" id="jam_layanan">
                            </div>
                        </div>
                    </div>

                    <!-- <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div> -->

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_verifikasi">Verifikasi</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <div class="modal fade bd-example-modal-lg" id="modalBatal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Form Tolak Pendaftaran</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Pesan Tambahan</label>
                        <textarea class="form-control" id="pesan_batal" rows="3" placeholder="Kosongkan Jika Tidak Digunakan"></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_batal">Batal</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        
        <!-- tambahan -->
        <div class="modal fade bd-example-modal-lg" id="modal_data_pasien" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Cek Data Pasien</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Nama Pasien</label>
                                <input type="text" class="form-control" id="cari_nama_pasien" placeholder="Nama Pasien">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Tanggal Lahir</label>
                                <input type="date" class="form-control" id="cari_tanggal_pasien">
                            </div>
                        </div>
                    </div>
                    <h6 class="modal-title" id="exampleModalLabel">Tabel Data Pasien</h6>
                    <div class="table-responsive">
                        <table class="table table-bordered" id="tablePasien" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th style="width:20%">Nomor RM</th>
                                    <th style="width:60%">Nama</th>
                                    <th style="width:20%">Tanggal Lahir</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_cari">Cari</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <div class="modal fade bd-example-modal-sm" id="modalBookingBaru" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Poli Tujuan Pasien</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Pilih Poli Tujuan Pasien</label>
                            <select class="form-control" id="poli_tujuan_booking">
                            </select>
                    </div>
                    <div class="form-group" disabled hidden>
                        <textarea class="form-control" id="alamat_booking" rows="3"></textarea>
                    </div>
                    <div class="form-group" disabled hidden>
                        <input type="text" class="form-control" id="no_booking">
                    </div>
                    <div class="form-group" disabled hidden>
                        <input type="text" class="form-control" id="nama_booking">
                    </div>
                    <div class="form-group" disabled hidden>
                        <input type="text" class="form-control" id="tgl_booking">
                    </div>
                    <!-- STTS -->
                    <!-- TGL_BOOKING TIMESTAMP -->
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_booking">Booking</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>


        <div class="modal fade bd-example-modal-md" id="modalBookingLama" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Booking Pasien Lama</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Pilih Poli Tujuan Pasien</label>
                                <select class="form-control" id="poli_booking_registrasi">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Pilih Dokter</label>
                                <select class="form-control" id="dokter_booking_registrasi">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Pilih Jaminan Pasien</label>
                                <select class="form-control" id="penjamin">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">No Rekam Medis</label>
                                <input type="text" class="form-control" id="no_rm_lama">
                            </div>
                        </div>
                    </div>
                    <div class="form-group" disabled hidden>
                        <input type="text" class="form-control" id="no_antrian_lama">
                    </div>
                    <div class="form-group" disabled hidden>
                        <input type="text" class="form-control" id="tgl_booking_lama">
                    </div>
                    <!-- STTS -->
                    <!-- TGL_BOOKING TIMESTAMP -->
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_booking_lama">Booking</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
    <!-- Bootstrap core JavaScript-->

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
    
    <!-- Page level custom scripts -->
    <script src="js/demo/datatables-demo.js"></script>
    <!-- tambahan -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script>
        // tambahan
        $(document).ready(function() {
            $('.select-modify').select2();
        });
    function TStoD(){
        let timeStamp= Date.now()
        let now= new Date(timeStamp);
        let time = ("0" + now.getHours()).slice(-2) + ":" 
                + ("0" + now.getMinutes()).slice(-2)+ ":" 
                + ("0" + now.getSeconds()).slice(-2);
        return time;
    }
    function TStoDT() {
        let timeStamp = Date.now();
        let now = new Date(timeStamp);
        let date =
            now.getFullYear() +
            "-" +
            ("0" + now.getMonth() + 1).slice(-2) +
            "-" +
            ("0" + now.getDate()).slice(-2);
        return date;
    }
    function HumanDate(param) {
        let now = new Date(param);
        let date =
            ("0" + now.getDate()).slice(-2) +
            "/" +
            ("0" + now.getMonth() + 1).slice(-2) +
            "/" +
            now.getFullYear();
        return date;
    }
    function dateSet(param) {
        if(param!=""){
            const today = new Date(param)
            const now = new Date(today)
            now.setDate(now.getDate() + 1)
            let date =
                now.getFullYear()+ "-" +
                ("0" + now.getMonth() + 1).slice(-2) +
                "-" +
                ("0" + now.getDate()).slice(-2);
            return date;
        }else{
            return param;
        }
    }
    function clear(params) {
        let next = $(params+' .modal-body').find('.form-group').find('.form-control')
        Object.keys(next).forEach(key => {
            //console.log(key)
            if(key!='length' &&key!='prevObject'){
                $('#'+next[key].id).val(null)
            }
        });
        $(params).modal('toggle')
    }
    function buttonPreserve(data) {
        let tgl_layanan = new Date(data.insert_at.split(' ')[0]);
        tgl_layanan.setDate(tgl_layanan.getDate() + 1);
        let tgl = 
            tgl_layanan.getFullYear() +
            "-" +
            ("0" + tgl_layanan.getMonth() + 1).slice(-2) +
            "-" +
            ("0" + tgl_layanan.getDate()).slice(-2);

        let btn = ""+
        "<div class='dropdown mb-4'>"+
        "<button class='btn btn-primary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
            "Aksi"+
        "</button>"+
        "<div class='dropdown-menu animated--fade-in' aria-labelledby='dropdownMenuButton'>"+
            "<button class='dropdown-item text-info detail' data-id='"+data.id_daftar+"' data-toggle='modal' data-target='#modalDetail'>Detail</button>"+
            "<button class='dropdown-item text-info setBookingBaru' data-nama='"+data.Nama+"' data-id='"+data.id_daftar+"'  data-tanggal='"+tgl+"' data-no='"+data.no_wa+"' data-toggle='modal' data-target='#modalBookingBaru' >Booking Pasien Baru</button>"+
            "<button class='dropdown-item text-info setBookingLama' data-nama='"+data.Nama+"' data-id='"+data.id_daftar+"'  data-tanggal='"+tgl+"' data-no='"+data.no_wa+"' data-toggle='modal' data-target='#modalBookingLama' >Booking Pasien Lama</button>"+
            "<button class='dropdown-item text-primary lampiran' data-id='"+data.id_daftar+"' data-toggle='modal' data-target='#modalLampiran'>Lampiran</button>"+
            "<button class='dropdown-item text-success setVerifikasi' data-poli='"+data.Poli_tujuan+"' data-jenis='"+data.Jenis_Bayar+"' data-id='"+data.id_daftar+"' data-nama='"+data.Nama+"' data-tanggal='"+tgl+"'  data-no='"+data.no_wa+"'  data-toggle='modal' data-target='#modalVerifikasi'>Verifikasi Pendaftaran</button>"+
            "<button class='dropdown-item text-warning setBatal' data-poli='"+data.Poli_tujuan+"' data-jenis='"+data.Jenis_Bayar+"' data-id='"+data.id_daftar+"' data-nama='"+data.Nama+"' data-tanggal='"+tgl+"'  data-no='"+data.no_wa+"' data-toggle='modal' data-target='#modalBatal'>Tolak Pendaftaran</button>"+
        "</div>"+
        "</div>";
        return btn
    }
    
    // tambahan
    $("#filter_tgl").change(function () {
        $.post('conf/api-serv.php',{getDataTanggal:$(this).val()}, function(data){
            data = JSON.parse(data)
            let counter = 1;
            if(data.length>0){
                let myTable = $('#dataTable').DataTable()
                let flagver
                myTable.clear().draw()
                data.forEach(ele => {
                    // console.log(buttonPreserve(ele))
                    if(ele.is_verified==0){
                       flagver = "<span class='badge badge-danger'>Belum di Verifikasi</span>"
                    }else if(ele.is_verified==2){
                        flagver = "<span class='badge badge-success'>Terverifikasi</span>"
                    }
                    myTable.row.add([
                        counter, 
                        ele.Nama, 
                        ele.Jenis_Bayar, 
                        ele.Poli_tujuan.split('_')[0], 
                        ele.Poli_tujuan.split('_')[1], 
                        ele.insert_at.split(' ')[1],
                        flagver,
                        buttonPreserve(ele)
                    ]).draw();
                    counter++;
                });
                // console.log(data)
            }else{
                alert("data tidak ditemukan")
                $('#dataTable').DataTable().clear().draw()
                // console.log("tidak ada data")
            }
        });
    })

    $('#btn_cari').click(function () {
        if($('#cari_nama_pasien').val()==""&&$('#cari_tanggal_pasien').val()==""){
            alert('silahkan isi nama atau tanggal lahir pasien')
        }else{
            $.ajax({
                type: "POST",
                url: "http://192.168.1.200:8082/getDataPasien/",
                // url: "http://192.168.1.4:8082/getPoli/",
                data:{
                    nama:$('#cari_nama_pasien').val(),
                    tgl_lahir:dateSet($('#cari_tanggal_pasien').val())
                },
                dataType: "JSON",
                success: function (data) {
                    // data = JSON.parse(data)
                    if(data.length>0){
                        //fungsi penyelamat
                        $("#tablePasien").dataTable().fnDestroy();
                        let tablePasien = $('#tablePasien').DataTable(
                                {
                                    pageLength : 5,
                                    lengthMenu: [[5], [5]]
                                }
                            )
                        tablePasien.clear().draw()
                        data.forEach(ele => {
                            tablePasien.row.add([
                                ele.no_rkm_medis, 
                                ele.nm_pasien, 
                                ele.tgl.split('T')[0]
                            ]).draw();
                        });
                    }else{
                        alert("data tidak ditemukan")
                        $('#tablePasien').DataTable().clear().draw()
                    }
                }
            });
        }
        
    })

    
    $("#dataTable").on('click','.setBookingBaru',function () {
            $.ajax({
                type: "GET",
                url: "http://192.168.1.200:8082/getPoli/",
                // url: "http://192.168.1.4:8082/getPoli/",
                dataType: "JSON",
                success: function (data) {
                    // // fungsi setbooking
                    $("#poli_tujuan_booking").html("")
                    data.forEach(ele => {
                        $("#poli_tujuan_booking").append(""+
                        "<option value='"+ele.kd_poli+"'>"+ele.nm_poli+"</option>"
                        +"")
                    });
                    // tambahan
                    if(!$("#poli_tujuan_booking").hasClass("select-modify")){
                        $("#poli_tujuan_booking").addClass("select-modify")
                        $("#poli_tujuan_booking").select2({ width: '100%' })
                    }
                }
            });
            $.post('conf/api-serv.php',{getDataRow:$(this).attr('data-id')}, function(data){
                $("#alamat_booking").val(JSON.parse(data)[0].Alamat)
            });
            $("#tgl_booking").val($(this).attr('data-tanggal'))
            $("#nama_booking").val($(this).attr('data-nama'))
            $("#no_booking").val($(this).attr('data-no'))
        })
        
        $("#dataTable").on('click','.setBookingLama',function () {
            $.ajax({
                type: "GET",
                url: "http://192.168.1.200:8082/getPoliDokter/",
                // url: "http://192.168.1.4:8082/getPoliDokter/",
                dataType: "JSON",
                success: function (data) {
                    // fungsi setbookinglama
                    $("#poli_booking_registrasi").html("")
                    let data_new = []
                    data.poli.forEach(ele => {
                        $("#poli_booking_registrasi").append(""+
                        "<option value='"+ele.kd_poli+"'>"+ele.nm_poli+"</option>"
                        +"")
                    });
                    $("#dokter_booking_registrasi").html("")
                    data.dokter.forEach(ele => {
                        $("#dokter_booking_registrasi").append(""+
                        "<option value='"+ele.kd_dokter+"'>"+ele.nm_dokter+"</option>"
                        +"")
                    });
                    $("#penjamin").html("")
                    data.penjab.forEach(ele => {
                        $("#penjamin").append(""+
                        "<option value='"+ele.kd_pj+"'>"+ele.png_jawab+"</option>"
                        +"")
                    });

                    // tambahan
                    if(!$("#poli_booking_registrasi").hasClass("select-modify")){
                        $("#poli_booking_registrasi").addClass("select-modify")
                        $("#poli_booking_registrasi").select2({ width: '100%' })
                    }
                    if(!$("#dokter_booking_registrasi").hasClass("select-modify")){
                        $("#dokter_booking_registrasi").addClass("select-modify")
                        $("#dokter_booking_registrasi").select2({ width: '100%' })
                    }
                    if(!$("#penjamin").hasClass("select-modify")){
                        $("#penjamin").addClass("select-modify")
                        $("#penjamin").select2({ width: '100%' })
                    }
                }
            });
            $("#tgl_booking_lama").val($(this).attr('data-tanggal'))
        })

        $("#btn_booking_lama").click(function () {
        let data_kirim = {
            "tanggal_booking":TStoDT(),
            "jam_booking":TStoD(),
            "no_rkm_medis":$("#no_rm_lama").val(),
            "tanggal_periksa":$("#tgl_booking_lama").val(),
            "kd_dokter":$("#dokter_booking_registrasi").val(),
            "kd_poli":$("#poli_booking_registrasi").val(),
            "kd_pj":$("#penjamin").val(),
            "waktu_kunjungan":TStoDT()+" "+TStoD()

        }
        alert("Data Sudah Dikirim")
        clear('#modalBookingLama')

        $.ajax({
            type: "POST",
            url: "http://192.168.1.200:8082/daftarBaruPasienLama/",
            // url: "http://192.168.1.4:8082/daftarBaruPasienLama/",
            data:{
                send:data_kirim
            },
            dataType: "JSON",
            success: function (data) {
            }
        });
    })

        $("#btn_booking").click(function () {
            let data_kirim = {
                "tanggal":$("#tgl_booking").val(),
                "nama":$("#nama_booking").val(),
                "alamat":$("#alamat_booking").val(),
                "no_telp":$("#no_booking").val(),
                "kd_poli":$("#poli_tujuan_booking").find(":selected").val(),
                "tanggal_booking":$("#tgl_booking").val()+" "+TStoD()
            }
            alert("Data Sudah Dikirim")
            clear('#modalBooking')

            $.ajax({
                type: "POST",
                url: "http://192.168.1.200:8082/setBooking/",
                // url: "http://192.168.1.4:8082/setBooking/",
                data:{
                    send:data_kirim
                },
                dataType: "JSON",
                success: function (data) {
                }
            });
        })

        $("#dataTable").on('click','.detail',function () {
            $.post('conf/api-serv.php',{getDataRow:$(this).attr('data-id')}, function(data){
                    dt = JSON.parse(data)[0]
                    $("#nama_pasien").val(dt.Nama)
                    $("#NIK_pasien").val(dt.NIK)
                    $("#Jenis_bayar_pasien").val(dt.Jenis_Bayar)
                    $("#Poli_tujuan_pasien").val(dt.Poli_tujuan.split("_")[0])
                    $("#Dokter_tujuan_pasien").val(dt.Poli_tujuan.split("_")[1])
                    $("#alamat_pasien").val(dt.Alamat)
                    $("#alamat_pasien").val(dt.Alamat)
                    $("#nm_pj").val(dt.nama_penjamin)
                    $("#nm_ibuk").val(dt.nama_ibu)
                    $("#no_pj").val(dt.no_penjamin)
                });
            })
        
        $("#dataTable").on('click','.lampiran',function () {
            $.post('conf/api-serv.php',{getLampiran:$(this).attr('data-id')}, function(data){
                    dt = JSON.parse(data)
                    console.log(dt)
                    let active;
                    let i=0
                    $("#carousel-lampiran").html("")
                    Object.keys(dt).forEach(key => {
                        if(i==0){
                            active="active";
                        }else{
                            active="";
                        }
                        if(dt[key]!=""){
                            $("#carousel-lampiran").append(""+
                            "<div class='carousel-item "+active+"'>"+
                            "<img class='w-100' style='height:500px' src='./upload/"+dt[key]+"' alt='First "+key+"'>"+
                                "</div>")
                            i++
                        }
                    });
                });
            })
        
        $("#dataTable").on('click','.setVerifikasi',function () {
            $('#Nama_pendaftar').val($(this).attr('data-nama'))
            $('#tanggal_layanan').val($(this).attr('data-tanggal'))
            $('#poli_tujuan').val($(this).attr('data-poli'))
            $('#data-jenis').val($(this).attr('data-jenis'))
            $('#btn_verifikasi').attr('data-id',$(this).attr('data-id'))
            $('#btn_verifikasi').attr('data-no',$(this).attr('data-no'))
        })

        $("#no_rm").keypress(function(event) {
            let keycode = event.keyCode || event.which;
            let no_rm = $(this).val()
            let tgl_periksa = $('#tanggal_layanan').val()
            if($(this).val()!=""){
                if(keycode == '13') {
                    $.ajax({
                        type: "POST",
                        url: "http://192.168.1.200:8082/getVerifikasi/",
                        // url: "http://192.168.1.4:8082/getVerifikasi/",
                        data:{
                            no_rm:no_rm,
                            tgl_periksa:tgl_periksa
                        },
                        dataType: "JSON",
                        success: function (data) {
                            data = data[0]
                            $('#poli_tujuan').val(data.nm_poli+'_'+data.hari_layanan+'_'+data.nm_dokter)
                            $('#no_antrian').val(data.antrian)
                            $('#jam_layanan').val(data.jam_layanan)
                        }
                    });
                    console.log($(this).val()+'\n'+$('#tanggal_layanan').val())
                    // request ke server buat nyari data antrian poli jam tunggu, tanggal layanan pasien dari db epasien
                    // alert('You pressed a "enter" key in somewhere');    
                }
            }
        });
        
        $("#no_rm_lama").keypress(function(event) {
            let keycode = event.keyCode || event.which;
            if($(this).val()!=""){
                if(keycode == '13') {
                    let rm = $(this).val()
                    $.ajax({
                        type: "POST",
                        url: "http://192.168.1.200:8082/getRM/",
                        // url: "http://192.168.1.4:8082/getRM/",
                        data:{
                            no_rm:rm
                        },
                        dataType: "JSON",
                        success: function (data) {
                            console.log(data)
                            if(data=='data tidak terdaftar'){
                                alert("data pasien belum terdaftar silahkan registrasi sebagai pasien baru")
                            }else{
                                alert("pasien dengan nomor rekam medis "+data[0].no_rkm_medis+" terdaftar dengan status sebagai pasien lama")
                            }
                        }
                    });
                }
            }
        });

        $('#btn_verifikasi').click(function (params) {
            let no_wa = $(this).attr('data-no')
            let pesan =
            "Assalamualaikum Wr. Wb. \n"+
            "Yth. Tn/Ny."+$('#Nama_pendaftar').val()+"\n"+
            "Nomor Rekam Medis : "+$('#no_rm').val()+"\n"+
            "Pendaftaran di hari "+$('#poli_tujuan').val().split('_')[1]+" tanggal "+HumanDate($('#tanggal_layanan').val())+" berhasil dilakukan\n"+
            "Nomor Antrian Anda : "+$('#no_antrian').val()+"\n"+
            "Silahkan datang pada Jam : "+$('#jam_layanan').val().split(':')[0]+':'+$('#jam_layanan').val().split(':')[1]+" WITA \n"+
            "di Poli : "+$('#poli_tujuan').val().split('_')[0]+' '+$('#poli_tujuan').val().split('_')[2]+"\n"+
            "di Mohon untuk datang 5 menit lebih awal dan langsung menuju Ruangan";
                
            $.post('conf/api-serv.php',{setVerifikasi:$(this).attr('data-id')}, function(data){
                data = JSON.parse(data)
                if(data==200){
                    alert("Data Sudah Dikirim")
                    clear('#modalVerifikasi')
                    $.ajax({
                        type: "POST",
                        url: "http://192.168.1.200:8081/sendToClient/",
                        // url: "http://192.168.1.4:8081/sendToClient/",
                        data: {
                            no:no_wa,
                            message:pesan
                        },
                        dataType: "JSON",
                        success: function name(data) {
                            // // fungsi clear
                        }
                    });
                }
            });
        })
        
        $("#dataTable").on('click','.setBatal',function () {
            $('#btn_batal').attr('data-poli',$(this).attr('data-poli'))
            $('#btn_batal').attr('data-nama',$(this).attr('data-nama'))
            $('#btn_batal').attr('data-tanggal',$(this).attr('data-tanggal'))
            $('#btn_batal').attr('data-id',$(this).attr('data-id'))
            $('#btn_batal').attr('data-no',$(this).attr('data-no'))
        })

        $('#btn_batal').click(function (params) {
            let no_wa = $(this).attr('data-no')
            let id = $(this).attr('data-id')
            let pesan =
            "Assalamualaikum Wr. Wb. \n"+
            "Yth. Tn/Ny. "+$(this).attr('data-nama')+"\n"+
            "Mohon Maaf Pendaftaran anda di tanggal "+$(this).attr('data-tanggal')+"\n"+
            "Pada Poli :"+$(this).attr('data-poli')+" di Tolak\n"+
            "Dikarenakan data yang anda kirim salah, tidak lengkap, lampiran tidak sesuai, lampiran kurang lengkap, atau layanan Poli Tutup/Kuota penuh\n"+
            "Dimohon untuk mengikuti arahan Admin Selanjutnya\n";
            
            if($('#pesan_batal').val()!=""){
                pesan = pesan+
                "Pesan tambahan dari Admin:\n"+
                $('#pesan_batal').val();
            };
            
            $.post('conf/api-serv.php',{setBatal:$(this).attr('data-id')}, function(data){
                data = JSON.parse(data)
                if(data==200){
                    alert("Data Sudah Dikirim")
                    clear('#modalBatal')
                    $.ajax({
                        type: "POST",
                        url: "http://192.168.1.200:8081/sendToClient",
                        // url: "http://192.168.1.4:8081/sendToClient",
                        data: {
                            hapus_id:id,
                            no:no_wa,
                            message:pesan
                        },
                        dataType: "JSON",
                        success: function name(data) {
                            // // console.log("data dikirim ke client")
                        }
                    });
                }
            });
        })

        

    </script>
</body>

</html>